const express= require("express")
const { db } = require("./db")
const { postsRoute } = require("./Routes/PostsRoute")
const { userRoute } = require("./Routes/usersRoute")
const cors=require("cors")


require("dotenv").config()


const app= express()

app.use(cors())
app.use(express.json())

app.use("/users",userRoute)

app.use("/posts",postsRoute)

app.listen(process.env.port,db)

