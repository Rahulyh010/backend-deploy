const jwt=require("jsonwebtoken")

const Auth=(req,res,next)=>{
    const token=req.headers.authorization
    //

    if(token){
        next()
    }else{
        res.send({"msg":"Login First"})
    }

    
}

const authPost=(req,res,next)=>{
    const token=req.headers.authorization
   
    if(token){
        const decoded= jwt.verify(token,"masai")
        req.body.userId=decoded.userId;
        next()
        

    }else{
        res.status(400).send({"msg":"Token Not found"})
    }
}


module.exports={
    Auth,
    authPost
}


