const mongoose=require('mongoose')

const newsSchema=new mongoose.Schema({
    title:String,
    description:String,
    date:String
})

module.exports=mongoose.model('newses',newsSchema)