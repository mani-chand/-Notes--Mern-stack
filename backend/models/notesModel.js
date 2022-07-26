const mongoose = require('mongoose')

const dbSchema= new mongoose.Schema({
    title:{type:String,required:true},
    creator:{type:String,required:true}
})
const result = mongoose.model('Book',dbSchema)

exports.result=result