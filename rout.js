const express = require('express')

const app = express()

const userModel = require('./schema')

const mongoose = require('mongoose')

const classSc=require('./classSchema')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())



app.post('/v1/myClass', async (req, res) => {
    try {
        const classs = req.body.class
        const studentsCount =req.body.studentsCount
        const createing =await userModel.create(req.body)
        return res.json({id:createing._id})

    } catch (error) {
        return res.json(error)
    }

})
app.post('/v1/myClass/:myClassId/students', async (req, res) => {
   try {
        const find =await userModel.findOne({_id:req.params.myClassId})
        const fin =(await classSc.find()).length
        const add =await classSc.create({
            name:req.body.name,
            classid:find._id,
            studentId:fin+1
        })
        return res.json({studentId:add.studentId})
   } catch (error) {
    res.json(error)
   }
})
app.get('/v1/myClass',async(req,res)=>{
    const find =await userModel.find()
    return res.status(200).json(find)
})
app.get('/v1/myClass/:myClassId',async(req,res)=>{
    try {
        const find =await userModel.find({_id:req.params.myClassId})
        if(find){
            return res.status(200).json(find)
        }else{
            return res.status(404).json('There is no class at that id')
        }
    } catch (error) {
        res.json(error)
    }
})
app.delete('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
   try {
        const find=await classSc.findOne({$and:[{classid:{$eq:req.params.myClassId}},{studentId:{$eq:req.params.studentId}}]})
        if(find){
            const da = await classSc.deleteOne({$and:[{classid:{$eq:req.params.myClassId}},{studentId:{$eq:req.params.studentId}}]})
            return res.status(202).json(da)
        }else{
            res.status(404).json('There is no task at that id')
        }
   } catch (error) {
        return res.status(404).json(error)
   }
})
app.get('/v1/myClass/:myClassId/students',async(req,res)=>{
    try {
        const find =await classSc.findOne({classid:req.params.myClassId})
        if(find){
            return res.status(200).json(find)
        }else{
            return res.status(404).json('There are no students at this class')
        }
    } catch (error) {
        return res.json(error)
    }
})
app.delete('/v1/myClass/:myClassId',async(req,res)=>{
    try {
        const find =await classSc.findOne({_id:req.params.myClassId})
        if(find){
            const del = await classSc.deleteOne({_id:req.params.myClassId})
            return res.status(202).json(del)
        }
    } catch (error) {
        res.json(error)
    }
})
app.get('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    try {
        const find=await classSc.findOne({$and:[{classid:{$eq:req.params.myClassId}},{studentId:{$eq:req.params.studentId}}]})
        if(find){
            return res.status(202).json(find)
        }
    } catch (error) {
        res.json(error)
    }
})
app.put('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    try {
        const find=await classSc.findOne({$and:[{classid:{$eq:req.params.myClassId}},{studentId:{$eq:req.params.studentId}}]})
        if(find){
            const update=await classSc.updateOne({$and:[{classid:{$eq:req.params.myClassId}},{studentId:{$eq:req.params.studentId}}]},req.body)
            return res.status(202).json(update)
        }else{
            return res.status(404).json()
        }
    } catch (error) {
        res.json(error)
    }
})
module.exports=app