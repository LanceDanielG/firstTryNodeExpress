const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('FUCK YEAH~')
})

app.listen(3000, ()=>{
    console.log('HELL NO CODE ~')
})