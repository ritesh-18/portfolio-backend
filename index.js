const express =require("express")
const mongoose=require("mongoose")
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000
app.use(express.json()) // body parser for json data




// api endpoints and db connection

mongoose.connect(process.env.Db_URL).then(()=>{
    console.log("connected to db")
})

//creating Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    }
})
const userModel=mongoose.model("users" , userSchema);

//Endpoints

// only post and get request
app.post("/add" , async(req, res)=>{
    try {
        const {name , email , msg}=req.body
        const user=new userModel({name,email,msg})
        
        console.log(user)
        await user.save()
        res.status(200).json({
            message:"user added successfully",
            user:user,
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:"error adding user",
            error:error
        })

        
    }
   
})

//get request to fetch all data
app.get("/get" , async(req, res)=>{
    try {
        const users=await userModel.find();

        res.status(200).json({
            message:"users fetched successfully",
            users:users
        })
        
    } catch (error) {
        res.status(400).json({
            message:"error fetching data",
            error:error
        })
    }
})

app.get("/",(req, res)=>{
    res.send("welcome to my api")
})




//App listen
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})