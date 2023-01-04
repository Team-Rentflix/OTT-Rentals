const Transaction = require('../models/transaction.model')
const jwt = require('jsonwebtoken')
const Post = require('../models/post.model')

require("dotenv").config({ path: "./config.env" });

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

exports.decryptPassword = async (req, res) => {
    try {
        const post = await Post.findById(req.query.post_id)
        if (!post) throw "No Post Found"
        console.log(post)
        if (jwt.verify(post.secret_key, process.env.SECRET)) {
            const {secret_key} = jwt.decode(post.secret_key)
            if(jwt.verify(post.acc_pass,secret_key)){
                const {acc_pass} = jwt.decode(post.acc_pass)
                res.send({status:true, password: acc_pass,acc_id: post.acc_id})
            }else{
                throw "Secret Key Invalid"
            }
        }else{
            throw "Some Error Occured"
        }
    } catch (err) {
        res.status(500).send({ status: false, error: err })
    }
}