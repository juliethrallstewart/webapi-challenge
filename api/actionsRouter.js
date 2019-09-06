const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel');

module.exports = router;

//helpers get, insert, update, remove

router.get('/', (req, res) => {
	db.get().then(result => {
		res.status(200).json(result);
    })
    .catch(e => {
        res.status(500).json({ error: 'error retrieving projects from database' });
    })
});

// insert a new action and associate to project id 

// update an action

// remove an action 