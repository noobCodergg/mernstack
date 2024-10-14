const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    data:String,
    createdAt: { type: Date, default: Date.now,expires:'24h' },
    status:Boolean,
    uid:String,
    id:String,
    date:String
})

module.exports=mongoose.model('tasks',taskSchema)