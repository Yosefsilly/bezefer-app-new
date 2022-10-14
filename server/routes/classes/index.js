const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('DoTo -> return list of classes')
})

router.get('/:id', (req, res) => [
    res.send(`ToDo -> return the list of students in this class`)
])

router.delete('/:id', (req, res) => [
    res.send(`ToDo -> check class is empty and delete chosen class`)
])
module.exports = router