const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET all route', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT DISTINCT "street_name", "street_history", "image_url", "link_url", "person_id", "street_id"
        FROM "streets"
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

router.put('/', (req, res) => {
    console.log('PUT route', req.body);
    const street=req.body;
    if(req.isAuthenticated()) {
        let queryText = `UPDATE "streets"
        SET "street_name" = $1, "street_history" = $2, "image_url" = $3, "link_url" = $4, "person_id" = $5
        WHERE "street_id" = $6;`;
        pool.query(queryText, [street.street_name, street.street_history, street.image_url, street.link_url, req.user.id, street.street_id])
        .then((results) => {
            res.sendStatus(200)
            console.log('These are the results of the PUT', results);
        })
    } else {
        res.sendStatus(403);
    }
})

router.delete('/', (req, res) => {
    console.log(req.query);
    console.log(req.query.street_id)
    // const street_id = req.params.street_id;
    if (req.isAuthenticated()) {
    pool.query(`DELETE FROM "streets"
                        WHERE "street_id" = ($1);`, [req.query.street_id])
        .then((results) => {
            res.sendStatus(200);
            console.log('These are the results of the DELETE', results)
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