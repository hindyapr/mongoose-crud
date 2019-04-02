const Transaction = require('../models/transaction');

class TransactionController {
    static create(req, res) {
        let now = new Date(req.body.out_date).getTime() || new Date().getTime();
        let list = req.body.booklist.split(',');
        let dueDate = now + (24 * 3600 * 1000) + (Math.floor(list.length / 2) * (24 * 3600 * 1000))

        Transaction
            .create({
                member: req.body.member,
                out_date: new Date(now),
                due_date: new Date(dueDate),
                in_date: null,
                booklist: req.body.booklist
            })
            .then(data => {
                res
                    .status(201)
                    .json({
                        message: 'transaction berhasil'
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })

    }
    static read(req, res) {
        if (req.query) {
            let obj = {
                booklist: req.query.id
            }
        } else {
            let obj = {}
        }

        Transaction
            .find(obj)
            .populate('member')
            .populate('booklist')
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })

    }

    static update(req, res) {
        let waktu = new Date()
        Transaction
            .findByIdAndUpdate(req.params.id, { in_date: waktu })
            .then(data => {
                res.json({
                    message: ""
                })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })

    }

    static delete(req, res) {
        Transaction
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({
                    message: "Transaction berhasil dihapus"
                })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })
    }
}

module.exports = TransactionController;