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

router.post('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    const action = req.body
    action.project_id = id

    db.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding post to database'})
        })
})

// update an action

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    db.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(e => {
            res.status(500).json({error: 'error updating the specified user in database'})
        })
})

// remove an action 

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
        .then(result => {
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({message: 'the specified project id was not found'})
            }
        })
        .catch(e => {
            res.status(500).json({error: 'error removing project from database'})
        })
});

// local middleware

function validateProjectId (req, res, next) {
    let id = req.params.id
    console.log(id)
    let post = {}
    db.get(id)
        .then(result => {
            if (result) {
                post = req.post;
                console.log('project validated')
            } else {
                res.status(404).json({ message: "invalid project id" })
            }
        })
        .catch(e => {
            res.status(500).json({error: 'error accessing specified project in database'})
        })
    

    next()
}