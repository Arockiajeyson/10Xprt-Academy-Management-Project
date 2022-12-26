const mongoose=require('mongoose')

const Schema = mongoose.Schema

const data = new Schema({
    id:Number,
    class:{type:Array},
    studentsCount:{type:Number,default:100}
});
const modl=mongoose.model('User',data)
module.exports=modl