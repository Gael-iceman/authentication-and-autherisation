const express = require("express");
const mongoose=require('mongoose')
const cors = require("cors");
const AdminModel=require('./models/admin') ;

const app= express();
app.use(express.json())
app.use(cors())
  
mongoose.connect("mongodb://127.0.0.1:27017/adminn");

app.post('/signup',(req,res)=>{
      AdminModel.create(req.body)
    .then(admins => res.json(admins))
    .catch(err =>res.json(err))
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    AdminModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("login successfull")
            }else{
                res.json("password incorrect")
            }
        }else{
            res.json({message:"user not found"})
        }
    })
})

app.listen(8800,()=>{
    console.log("server running on port 8800") 
})