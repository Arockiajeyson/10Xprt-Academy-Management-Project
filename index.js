const express = require('express')

const app = express()
const userModel = require('../schema')

const mongoose = require('mongoose')


const bodyParser = require('body-parser')
const db=require('./db')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())


app.use('/',require('../rout'))

app.listen(3000,async()=>{
    await db()
    console.log("port up")})
