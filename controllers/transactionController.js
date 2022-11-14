const Transaction = require('../models/transaction.model')

exports.storeTransactionData = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(200).send({ status: true })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err })
    }
}