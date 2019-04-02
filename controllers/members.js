const Member = require('../models/member');

class MemberController {
    static create(req, res) {
        Member
            .create({
                name: req.body.name,
                address: req.body.address,
                zipcode: req.body.zipcode,
                email: req.body.email,
                phone: req.body.phone
            })
            .then(data => {
                res
                    .status(201)
                    .json({
                        message: 'Member berhasil didaftarkan'
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
        Member
            .find({})
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
        Member
            .findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                address: req.body.address,
                zipcode: req.body.zipcode,
                email: req.body.email,
                phone: req.body.phone
            })
            .then(data => {
                res.json({
                    message: "Data member berhasil diperbaharui"
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
        Member
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({
                    message: "Member berhasil dihapus"
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

module.exports = MemberController;