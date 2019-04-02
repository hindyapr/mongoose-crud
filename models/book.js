const monggose = require('mongoose');

const bookSchema = new monggose.Schema({
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number
})


const Book = monggose.model("Book", bookSchema);

module.exports = Book;