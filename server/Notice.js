const mongoose=require('mongoose')

const noticeSchema=new mongoose.Schema({
    title:String,
    description:String,
    date:String
})

module.exports=mongoose.model('notices',noticeSchema)