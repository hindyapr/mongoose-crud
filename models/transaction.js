const monggose = require('mongoose');


const transactionSchema = new monggose.Schema({
    member: { type: monggose.Schema.Types.ObjectId, ref: 'Member' },
    in_date: Date,
    out_date: Date,
    due_date: Date,
    fine: Number,
    booklist: [{ type: monggose.Schema.Types.ObjectId, ref: 'Book' }]
})

transactionSchema.post('findOneAndUpdate', function(data) {
    let now = new Date(data.in_date).getTime();
    let due = new Date(data.due_date).getTime();
    console.log(now, due, data);
    if (now - due < 0) {
        data.fine = 0
        data.save()
    } else {
        let denda = Math.ceil((now - due) / (24 * 3600 * 1000)) * 1000
        data.fine = denda;
        data.save()
    }
})


const Transaction = monggose.model("Transaction", transactionSchema);

module.exports = Transaction;