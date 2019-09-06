const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel');

module.exports = router;

//helpers get, insert, update, remove, getProjectActions

// get all the projects

router.get('/', (req, res) => {
	db.get().then(result => {
		res.status(200).json(result);
    })
    .catch(e => {
        res.status(500).json({ error: 'error retrieving projects from database' });
    })
});

// get all the actions associate with a project

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id

    db.getProjectActions(projectId)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(e => {
        res.status(500).json({error: 'error getting actions from server'})
    })

});

// insert a new project

router.post('/', validateProject, (req, res) => {
    const newProject = req.body

    db.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding new project to database'})
        })
});



// update a current project

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

// remove a project 

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
function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function validateProject (req, res, next) {
    const newProject = req.body

    if (newProject.name && newProject.description) {
        next()
    }

    isEmpty(newProject) ? res.status(400).json({ message: "missing project data" }) : 
    !newProject.name ? res.status(400).json({ message: "missing required name field" }) :
    !newProject.description ? res.status(400).json({ message: "missing required description field" }) :
    console.log('post validated')

    
}
