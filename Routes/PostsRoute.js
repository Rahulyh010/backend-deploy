
const express=require("express")
const { Auth, authPost } = require("../Middlewares/Authentication")
const { PostModel } = require("../Models/postsModel")
const jwt=require("jsonwebtoken")

const postsRoute=express.Router()

postsRoute.get("/",Auth,async(req,res)=>{

    const token= req.headers.authorization
    const decoded=jwt.verify(token,"masai")

    const data= await PostModel.find({userId:decoded.userId})

     res.send(data)
})


postsRoute.get("/:pageno",Auth, async(req,res)=>{
    const token= req.headers.authorization
    const decoded=jwt.verify(token,"masai")

    const data= await PostModel.find({userId:decoded.userId})
    
const {pageno}=req.params;

if(pageno){
    
    const n= +pageno;

    const pages= n*3;
    let d1= data[pages-3]
    let d2= data[pages-2]
    let d3= data[pages-1]
      
   const newdata= []
   newdata.push(d1)
   newdata.push(d2)
   newdata.push(d3)

   res.status(200).send(newdata);

}

})


postsRoute.patch("/update/:id",Auth,async(req,res)=>{

const {id}=req.params
    const data= await PostModel.findByIdAndUpdate({_id:id},req.body)

    res.send({"msg":"Updated"})



})


postsRoute.delete("/delete/:id",Auth,async(req,res)=>{

    const {id}=req.params
        const data= await PostModel.findByIdAndDelete({_id:id})
    
        res.send({"msg":"deleted"})
    
    
    
    })





postsRoute.post("/add",authPost, async(req,res)=>{

const payload=req.body;

const data= new PostModel(payload);
await data.save();

res.status(200).send({"msg":"Successfully Posted"})


})




module.exports={
    postsRoute
}

