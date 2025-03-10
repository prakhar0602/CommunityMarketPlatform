const express=require('express')
const app=express();
const env=require('dotenv')
env.config()
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser = require('cookie-parser')
const auth = require('./routes/auth')
const item = require('./routes/item')
const messages = require("./routes/messages")

const PORT=process.env.PORT || 8080

app.use(cors({ 
    origin:['https://community-market-platform.vercel.app/','http://localhost:5173'],
   credentials:true,
    methods:["GET","POST","PATCH","DELETE"],
    headers: ["Content-Type", "Authorization", "Origin", "Accept"]
})); 

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log('Database connected');
}).catch((error)=>{ 
    console.log(error.message) 
    console.log('Database connecting error....');
})


app.use(auth);
app.use(item);
app.use(messages);

app.listen(PORT,()=>{
    console.log("Server is started at",PORT);
})