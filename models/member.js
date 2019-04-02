const monggose = require('mongoose');


const memberSchema = new monggose.Schema({
    name: String,
    address: String,
    zipcode: String,
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        type: String,
        min: 11,
        max: 13
    }
})

let validator = function(value) {

    return new Promise(function(resolve, reject) {
        Member
            .findOne({ email: value })
            .then(data => {
                if (data) {
                    resolve(false);
                } else {
                    resolve(true);
                }

            })
            .catch(err => {
                reject(err);
            })
    })
}

memberSchema.path('email').validate(validator);


const Member = monggose.model("Member", memberSchema);




module.exports = Member;