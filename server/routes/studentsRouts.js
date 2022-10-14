const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentsController')

router.get('/', studentsController.all)
router.get('/:id', studentsController.all_in_class)
router.patch('/', studentsController.add_to_class)
router.patch('/removefromclass', studentsController.remove_form_class)
router.post('/', studentsController.add)
router.delete('/:id', studentsController.delete_by_id)

module.exports = router