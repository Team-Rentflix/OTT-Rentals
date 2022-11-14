const express = require('express')
const router = express.Router();
const auth = require('../libs/auth')
const transactionController = require('../controllers/transactionController')

router.post('/transaction-success', auth, transactionController.storeTransactionData)

module.exports = router