const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET all route');
    // if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "item";`
        pool.query(queryText)
        .then((result) => {
            console.log(result.rows)
            res.send(result.rows);
        }).catch((error) => {
            console.log('error on item GET: ', error);
            res.sendStatus(500);
        })
    });
//     } else {
//         res.sendStatus(403);
//     }
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;