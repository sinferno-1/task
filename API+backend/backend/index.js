const express = require('express');
const mongoose= require('mongoose')
require('dotenv').config() ;

const authroute = require('./routes/authRoute')
const eventsroute = require('./routes/eventsRoute')

const app = express() ;

app.use(express.json()) ;
app.use('/api/auth',authroute);
app.use('/api/event',eventsroute);

app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(err.code || 500).json({ message : err.message})
})

try {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yhzzkqy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ).then( ()=>{
        console.log("mongodb connected...") ;
        app.listen(process.env.PORT || 4000 , ()=>
        console.log("listening on port " + process.env.PORT)) ;
    })
} catch (error) {
    console.log(error)
}
