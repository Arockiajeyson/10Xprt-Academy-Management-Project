const mongoose=require('mongoose')

const Schema = mongoose.Schema

const data = new Schema({
    classs:String,
    studentsCount:{type:Number}
});
const modl=mongoose.model('Cluser',data)
module.exports=modl