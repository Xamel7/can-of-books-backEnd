const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

bookModel = mongoose.model("Book", bookSchema)

let arrayOfBooks = [
    {
        title: 'Book 1',
        description: 'description 1',
        status: 'status 1'
    },
    {
        title: 'Book 2',
        description: 'description 2',
        status: 'status 2'
    },
    {
        title: 'Book 3',
        description: 'description 3',
        status: 'status 3'
    }
];

bookModel.insertMany(arrayOfBooks);


module.exports = bookModel