'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookModel = require("./books");
const { default: mongoose, connect } = require('mongoose')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
// Connect to the database using the provided connection string
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
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
    let allBooks = await bookModel.find({});
    // Send the retrieved books as the response
    response.send(allBooks)
  } catch (error) {
    // Handle server error
    response.status(500).json({ error: 'Server Error' });
  }
})

app.post('/books', async (request, response) => {
  // Extract the book cover data from the request body
  let cover = request.body;
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
})


app.delete('/books/:id', async (request, response) => {
  // Extract the book ID from the request parameters
  let bookId = request.params.id
  // Delete the book with the specified ID from the allBooks collection
  await allBooks.findByIdAndDelete(bookId)
      // Send a response indicating successful deletion
      response.send('Error: Books Unavailable')
    .catch((error) => {
      // Handle database error and send an error response
      response.status(500).json({ error: error.message })
    });
  // If the control reaches this point, it means the response was sent earlier
  // In case of an error or invalid ID, the response will be 'Book deleted'
  // Therefore, the line below might not be necessary or accurate
  // response.send('Error: Books Unavailable');
});

app.put('/books/:id', async (request, response) => {
  // Extract the book ID from the request parameters
  let coverId = request.params.id;
  // Extract the updated book cover data from the request body
  let cover = request.body
   // Find the book with the specified ID and update it with the new cover data
  // The { new: true } option ensures that the updated document is returned
  let newCover = await bookModel.findByIdAndUpdate(coverId, cover, {
    new: true
  });
  // Send the updated book cover as the response
  response.send(newCover)
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
