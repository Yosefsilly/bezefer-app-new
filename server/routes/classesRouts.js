const express = require('express')
const router = express.Router()

const classesController = require('../controllers/classesController')

router.get('/', classesController.all)

router.get('/:id', classesController.get_by_id)

router.post('/', classesController.add)

router.delete('/:id', classesController.delete_by_id)

module.exports = router