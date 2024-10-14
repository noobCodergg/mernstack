const mongoose=require('mongoose')

const appSchema=new mongoose.Schema({
    name:String,
    email:String,
    description:String,
    id:String,
    status:String,
    uniqueID:String
})

module.exports=mongoose.model('applications',appSchema)

