const express = require('express');
const { addTransection, getAllTransection ,editTransection,deleteTransection} = require('../controllers/transectonController');
const router = express.Router()

// Add transection route post
router.post('/add-transection', addTransection)

// Get transection route get
router.post('/get-transection', getAllTransection)

// Edit transection route post
router.post('/edit-transection', editTransection)

// Delete transection route post
router.post('/delete-transection', deleteTransection)

module.exports = router;