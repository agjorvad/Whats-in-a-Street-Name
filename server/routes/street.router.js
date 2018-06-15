const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET all route', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "streets";`
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

module.exports = router;