const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const cron = require('node-cron');
const employeeModel=require('./Model.js')
const newsModel=require('./News.js')
const noticeModel=require('./Notice.js')
const appModel=require('./Application.js')
const taskModel=require('./Task.js')
const bcrypt=require('bcrypt')
const { use } = require('bcrypt/promises.js')




const app=express();
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    methods:["POST","GET","PUT"],
    credentials:true
}))

app.use(bodyParser.json({ limit: '2000mb' })); // Set to 10mb or adjust as needed
app.use(bodyParser.urlencoded({ limit: '2000mb', extended: true }));
mongoose.connect('mongodb://localhost:27017/Info')


app.post('/login',(req,res)=>{
    const {email,password}=req.body
  
    employeeModel.findOne({email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({email:user.email,role:user.role},"json-web-token",{expiresIn:"1h"})
                    res.cookie('token',token)
                    res.json({role:user.role,id:user.id})
                }
                else{
                    res.json("wrong credentials")
                }
            })
        }
        else{
            res.json('user not found')
        }
    })

})



app.post('/createaccount',(req,res)=>{

    const {id,name,joiningDate,address,bloodGroup,title,role,contact,email,password,profilePicture,coverPhoto,status}=req.body

    bcrypt.hash(password,10)
    .then(hash=>{
        employeeModel.create({id,name,joiningDate,address,bloodGroup,title,role,contact,email,password:hash,profilePicture,coverPhoto,status})
        .then(employee=>res.json(employee))
    })
})

const authentication=(req,res,next)=>{
    const token= req.cookies.token
    if(!token){
        return res.json("token is missing")
    }
    else{
        jwt.verify(token,"json-web-token",(err,decoded)=>{
            if(err){
                return res.json("Error with token")
            }
            else{
                if(decoded.role==='Admin'){
                    next();
                }
                else{
                    return res.json("Not authorized")
                }
            }
        })
    }
}

const eauthentication=(req,res,next)=>{
    const token= req.cookies.token
    if(!token){
        return res.json("token is missing")
    }
    else{
        jwt.verify(token,"json-web-token",(err,decoded)=>{
            if(err){
                return res.json("Error with token")
            }
            else{
                if(decoded.role==='Employee'){
                    next();
                }
                else{
                    return res.json("Not authorized")
                }
            }
        })
    }
}

app.get('/auth',authentication,(req,res)=>{
    res.json('success')
})

app.get('/eauth',eauthentication,(req,res)=>{
    res.json('esuccess')
})

app.get('/logout',(req,res)=>{
    const token=req.cookies.token
    res.clearCookie('token');
    res.json("Cleared cookie")
})


app.get('/all',(req,res)=>{
    employeeModel.find()
    .then(user=>
    {
        res.json(user)
    }
    )
})

app.get('/detail/:id',(req,res)=>{
    const id=req.params.id;
    employeeModel.findOne({id})
    .then(user=>res.json(user))
})

app.post('/news',(req,res)=>{
    const {title,description,date}=req.body

    newsModel.create({title,description,date})
    
})

app.post('/notice',(req,res)=>{
    const {title,description,date}=req.body

    noticeModel.create({title,description,date})
    
})

app.get('/allnews',(req,res)=>{
    newsModel.find()
    .then(news=>res.json(news))
})

app.get('/allnotice',(req,res)=>{
    noticeModel.find()
    .then(news=>res.json(news))
})

app.post('/postapp',(req,res)=>{


    const {name,email,description,id,status,uniqueID}=req.body

    appModel.create({name,email,description,id,status,uniqueID})
})


app.get('/myapp/:id',(req,res)=>{

    const id=req.params.id
    appModel.find({id})
    .then(app=>res.json(app))
})

app.get('/myappdetail/:uniqueID',(req,res)=>{
    const uniqueID=req.params.uniqueID
    
    appModel.findOne({uniqueID})
    .then(apps=>res.json(apps))
})

app.get('/allapplication',(req,res)=>{
    appModel.find()
    .then(app=>res.json(app))
})

app.get('/allapplicationdetail/:uniqueID',async (req,res)=>{

    const uniqueID=req.params.uniqueID
    const result=await appModel.findOne({uniqueID})
    .then(app=>res.json(app))
})


app.put('/updatestatus/:uniqueID',async (req,res)=>{
   const uniqueID=req.params.uniqueID
   const {status}=req.body
   const result = await appModel.updateOne(
    { uniqueID }, // Find the document by uniqueID field
    { $set: { status } }, // Set the new status value
    { new: true } // Options: { new: true } is typically for `findOneAndUpdate`, but updateOne does not return the updated doc.
  );
})



  app.get('/gettask/:id',(req,res)=>{
    const id=req.params.id
    taskModel.find({id})
    .then(user=>res.json(user))
  })

  app.post('/posttask',(req,res)=>{
    const {data,status,uid,id,date}=req.body

    taskModel.create({data,status,uid,id,date})
  })


  app.put('/taskcomplete/:uid', async (req, res) => {
  
      const  uid  = req.params.uid;
      const  {status}  = req.body;
  
      
      await taskModel.updateOne(
        {uid},
        { $set:{status} },
        { new: true }
      );
  
  });

  cron.schedule('* * * * *', async () => {
    const cutoff = new Date(Date.now() - 7*24*60*60*1000); // 24 hours ago
    await taskModel.deleteMany({ createdAt: { $lt: cutoff } }); // Delete tasks older than 24 hours
    console.log('Deleted tasks older than 24 hours');
  });


  app.put('/setstatus/:id', async (req, res) => {
  
    
    const  id  = req.params.id;
    const  {status}  = req.body;

    console.log(id)
    await employeeModel.updateOne(
      {id},
      { $set:{status} },
      { new: true }
    );

});

app.listen(8000,()=>{
    console.log("Server running")
})