const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true, 'Please Enter a Product']
        },
        quantity: {
            type: Number,
            requried: true,
            default: 0
        },
        price: {
            type: Number,
            requried: true,
        },
    }, 
    {
        timestamp: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports =  Product;