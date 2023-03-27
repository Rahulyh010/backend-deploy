const express= require("express")
const { UserModel } = require("../Models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRoute= express.Router()


userRoute.get("/",async(req,res)=>{
    const data= await UserModel.find()
    res.send(data)
})


userRoute.post("/register",async(req,res)=>{

    try {
        const {email,password}=req.body;

        const data=await UserModel.find({email})
    
        if(data.length>0){
            res.status(200).send({"msg":"Already Registered Please Login"})
        }else{
         bcrypt.hash(password,5,async(err,hash)=>{
               if(hash){
                let data=new UserModel({...req.body,password:hash})
                   await data.save()
                   res.status(200).send({"msg":"Successfully Registered"})
               }
         })
            
    
        }
      
    } catch (error) {
       
        console.log(error)
    }

   


})


userRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body;


    const data= await UserModel.find({email})

    if(data.length>0){

        bcrypt.compare(password,data[0].password,(err,result)=>{
            if(result){
                res.status(200).send({"msg":"Logged In","token":jwt.sign({"userId":data[0]._id},"masai")})
            }else{
                res.status(400).send({"error":err.message})
            }
        })

    }else{
        res.status(400).send({"error":"Invalid email or password"})
    }



})




module.exports={
    userRoute
}

/**
 * {
    "name":"Rahul",
    "email":"rahulyh@gmail.com",
    "password":"rahul",
    "age":20,
    "city":"hidkal",
    "is_married":false
}
 */

