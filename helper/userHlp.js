const Transaction = require('../models/transaction.model')

module.exports = {
    getUserPurchases: async (user, cb) => {
        try {
            const user_transaction_details = await Transaction.find({ sender_id: user._id })
            cb(null, user_transaction_details)
        } catch (err) {
            cb(err, null)
        }
    }
}