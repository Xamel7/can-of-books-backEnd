const mongoose = require("mongoose")
let bookModel

        const bookSchema = new mongoose.Schema({
            title: String,
            description: String,
            status: String
        });

        bookModel = mongoose.model("Book", bookSchema)


        let arrayOfBooks = [
            {
                title: 'Book 1',
                author: 'Author 1',
                genre: 'Genre 1'
            },
            {
                title: 'Book 2',
                author: 'Author 2',
                genre: 'Genre 2'
            },
            {
                title: 'Book 3',
                author: 'Author 3',
                genre: 'Genre 3'
            },
        ];

        bookModel.insertMany(arrayOfBooks);





module.exports = bookModel
// module.exports = bookSchema