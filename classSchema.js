const mongoose=require('mongoose')

const Schema = mongoose.Schema

const data = new Schema({
    name:{type:String},
    classid:{type:mongoose.Types.ObjectId,ref:'Cluser'},
    studentId:{type:Number,default:Math.round(Math.random()*100)}
});
const modl=mongoose.model('classUser',data)
module.exports=modl