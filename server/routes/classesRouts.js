const express = require('express')
const router = express.Router()

const classesController = require('../controllers/classesController')

router.get('/', classesController.all)

router.get('/isExist/:id', classesController.isIdExist)

router.post('/', classesController.add)

router.delete('/:id', classesController.delete_by_id)

module.exports = router