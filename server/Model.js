const mongoose=require('mongoose')



const employeeSchema=new mongoose.Schema({
    id:String,
    name:String,
    joiningDate:String,
    address:String,
    bloodGroup:String,
    title:String,
    role:String,
    contact:String,
    email:String,
    password:String,
    profilePicture:String,
    coverPhoto:String,
    status:Boolean
})



module.exports=mongoose.model("employees",employeeSchema)


