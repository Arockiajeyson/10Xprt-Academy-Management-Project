const express = require('express')

const app = express()

const userModel = require('./schema')

const mongoose = require('mongoose')



const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())


let cont = 1
app.post('/v1/myClass', async (req, res) => {
    // return res.send('ok')
    try {
        if (req.body.class) {
            const data = await userModel.create({
                id: cont,
                class: req.body.class,
                studentsCount: 100
            })
            console.log(data)
            cont++
            return res.json(data)
        } else {
            return res.status(400).json('error')
        }
    } catch (e) {
        return res.json(e)
    }
})
app.post('/v1/myClass/:myClassId/students', async (req, res) => {
    const dar = await userModel.find({ id: req.params.myClassId })
    // // console.log(dar[0].class)
    // // req.data= dar.class.push(req.body.class)
    // console.log(req.body.class)
    const data=await userModel.updateMany({id: req.params.myClassId},{class:[req.body.class]})
    return res.json(data)
})
app.get('/v1/myClass',async(req,res)=>{
    const data=await userModel.find()
    return res.json(data)
})
app.get('./v1/myClass/:myClassId',async(req,res)=>{
    const data =await userModel.find({id:req.params.myClassId})
    return res.status(200).json(data)
})
app.delete('./v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    const data =await userModel.deleteOne({id:req.params.myClassId})
    return res.json(data)
})
app.delete('./v1/myClass/:myClassId',async(req,res)=>{
    const data =await userModel.deleteMany({id:req.params.myClassId})
    return res.json(data)
})
app.get('./v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    const data =await userModel.find({id:req.params.myClassId})
    return res.json(data)
})
app.put('./v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    const data =await userModel.updateOne({id:req.params.myClassId})
    return res.json(data)
})
module.exports=app