const mongoose=require("mongoose")

require("dotenv").config()

const db= async()=>{

    try {
        const connection=await mongoose.connect(`${process.env.mongo_url}`)
       console.log("Connected to mongosh")
    } catch (error) {
       console.log(error) 
    }
   
}


module.exports={
    db
}