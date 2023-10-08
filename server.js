const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Product = require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res)=>{
    res.send('HelloW Lord~')
})

app.get('/testRequest', (req, res)=>{
    res.send('TEST TEST')
})
 
app.post('/products', async(req, res)=>{
    try {
        const prod = await Product.create(req.body)
        res.status(200).json(prod)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/products', async(req, res) =>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: `Cannot Update with ID ${id}`}) // String Interpolation use backtics `
        }
        const updatedProduct = await Product.findById(id) // Reload
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: `Cannot Delete with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set('strictQuery', false)
mongoose.connect('mongoDBURI').then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('HELL NO CODE ~')
    })  
}).catch((error)=>{
    console.log(error)
})
