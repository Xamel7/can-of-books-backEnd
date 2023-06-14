'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookModel = require("./books");
const mongoose = require('mongoose')
const verifyUser = require("./verifyUser")


const app = express();
app.use(cors());
app.use(express.json());
app.use(verifyUser)

const PORT = process.env.PORT || 3001;
// Connect to the database using the provided connection string
mongoose.connect(process.env.DATABASE_CONNECTION_STRING), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Log a success message when the connection is established 
console.log('Connected Successful')


// app.get('/test', async (request, response) => {
//   // Attempt to connect to the database
//   await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
//     .catch((err) => {
//       // Handle connection error
//       console.log(err.message)
//     })
//   // Send a response indicating that the test request was received
//   response.send('test request received')

// })

app.get('/books', async (request, response) => {
  try {
    // Fetch all books from the database
    let allBooks = []
    if (request.user?.email) {
      allBooks = await bookModel.find({ email: request?.user?.email }).exec();
    } else {
      allBooks = await bookModel.find()

    }
    // Send the retrieved books as the response
    response.send(allBooks)
  } catch (error) {
    // Handle server error
    console.log(error)
    response.status(500).json({ error: 'Server Error' });
  }
})

app.post('/books', async (request, response) => {
  try {
    // Extract the book cover data from the request body
    let cover = new bookModel({
      title: request.body.title,
      description: request.body.description,
      status: request.body.status
    })
    // Assign the email property of the user object to the book
    cover.email = request.user?.email || ""
    // Insert the book cover into the arrayOfBooks collection
    bookModel.insertMany(cover)
      .then(() => {
        // Log a success message when the book is added
        console.log('New Book Added')
      }).catch((error) => {
        // Handle database error and send an error response
        response.status(500).json({ error: error.message })
      })
    // Send a response indicating that the request was received
    response.send('Heard')
  } catch (error) {
    console.log(error)
  }
})


app.delete('/books/:id', async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    let bookId = request.params.id
    // Delete the book with the specified ID from the allBooks collection
    await bookModel.findByIdAndDelete(bookId)
    // Send a response indicating successful deletion
    response.send('Deleted book')
    // If the control reaches this point, it means the response was sent earlier
    // In case of an error or invalid ID, the response will be 'Book deleted'
    // Therefore, the line below might not be necessary or accurate
    // response.send('Error: Books Unavailable');
  } catch (error) {
    console.log(error)
  }
});

app.put('/books/:id', async (request, response) => {
  try{
  // Extract the book ID from the request parameters
  let coverId = request.params.id;
  // Extract the updated book cover data from the request body
  let cover = request.body
  // cover._id = request.params.id
  // Find the book with the specified ID and update it with the new cover data
  // The { new: true } option ensures that the updated document is returned
  let newCover = await bookModel.findByIdAndUpdate(coverId, cover,  { new: true });
  // Send the updated book cover as the response
  response.send(newCover)
  } catch(error){
    console.log(error)
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
