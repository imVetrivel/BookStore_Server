const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,  // This will typically store a URL or file path to the image
        required: true
    },
    overview:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type:String,
        required:true
    }
});



const Books = mongoose.model("Books",bookSchema)

module.exports = Books;