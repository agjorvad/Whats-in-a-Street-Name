const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET all route', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "streets"
        ORDER BY "street_name" ASC;`
        pool.query(queryText)
        .then((result) => {
            console.log(result.rows)
            res.send(result.rows);
        }).catch((error) => {
            console.log('error on GET: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
console.log('POST all route', req.body);
const street= req.body;
if(req.isAuthenticated()) {
    let queryText =  `INSERT INTO "streets" ("street_name", "street_history", "latitude", "longitude", "image_url", "link_url", "person_id") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    pool.query(queryText, [street.street_name, street.street_history, street.latitude, street.longitude, street.image_url, street.link_url, req.user.id])
    .then((result) =>{
    res.sendStatus(201)
}).catch((error) => {
    console.log('error on POST', error);
    res.sendStatus(500);
})
}else {
    res.sendStatus(403);
}
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    const street_id = req.params.id;
    console.log(street_id);
    if (req.isAuthenticated()) {
    pool.query(`DELETE FROM "streets"
                        WHERE "id" = ($1);`, [street_id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('problem with DELETE from database', error);
            res.sendStatus(500);
        });
    }else {
            res.sendStatus(403);
        }
});

// ******** DELETE route template (delete comments)
router.delete('/deleteComment/:id', (req, res) => {
    console.log('DELETE comment route', req.params.id);
    if(req.isAuthenticated() ) {
        let queryText = `DELETE FROM "comment" 
                        WHERE "id" = $1 AND
                        "person_id" = $2;`;
        pool.query(queryText, [req.params.id, req.user.id])
        .then((result)  =>  {
            res.sendStatus(200);
        })
        .catch((error)  =>  {
            console.log('error on DELETE: ', error)
            res.sendStatus(500);
        })
    } else{
        res.sendStatus(403);
    }
});

router.put('/', (req, res) => {
    console.log('PUT route', req.body);
    const street=req.body;
    if(req.isAuthenticated()) {
        let queryText = `UPDATE "streets"
        SET "street_name" = $1, "street_history" = $2, "latitude" = $3, "longitude"=$4, "link_url"=$5, "person_id"=$6
        WHERE "id" = $7;`;
        pool.query(queryText, [street.street_name, street.street_history, street.latitude, street.longitude, street.link_url, req.user.id, street.id])
        .then((results) => {
            res.sendStatus(200)
        })
    } else {
        res.sendStatus(403);
    }
})

router.put('/editComment', (req, res) => {
    console.log('PUT editComment route');
    console.log(req.body);

    if (req.isAuthenticated()) {
        let queryText = `UPDATE "comment" SET "reply" = $1
                        WHERE "person_id" = $2 AND "id" = $3`;
        pool.query(queryText, [req.body.reply, req.user.id, req.body.replyId])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on PUT: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});



module.exports = router;