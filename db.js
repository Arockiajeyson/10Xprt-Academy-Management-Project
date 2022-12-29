const mongoose = require('mongoose')

const db=async()=>{
    await mongoose.connect('mongodb://localhost/prtTest')
    console.log('done')
}
module.exports=db