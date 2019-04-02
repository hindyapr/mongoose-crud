const Book = require('../models/book');

class BookController {
    static create(req, res) {
        Book
            .create({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: Number(req.body.stock)
            })
            .then(data => {
                res
                    .status(201)
                    .json({
                        message: 'Buku berhasil didaftarkan'
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
        if (req.query.search) {
            let obj = {
                $or: [{
                        author: {
                            $regex: new RegExp(`.*${req.query.search}.*`, `i`)
                        }
                    },
                    {
                        title: {
                            $regex: new RegExp(`.*${req.query.search}.*`, `i`)
                        }
                    }
                ]
            }
        } else {
            let obj = {}
        }
        Book
            .find(obj)
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
        Book
            .findByIdAndUpdate(req.params.id, {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: Number(req.body.stock)
            })
            .then(data => {
                res.json({
                    message: "Data buku berhasil diperbaharui"
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
        Book
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({
                    message: "Data buku berhasil dihapus"
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

module.exports = BookController;