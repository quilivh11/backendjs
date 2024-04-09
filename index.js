const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://frontendjs-nguyen-minh-huys-projects-84e99abe.vercel.app/',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true });
  next();
});

app.use("/api",router)

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connect to DB")
        console.log("Server is running http://localhost:"+PORT)
    })
})
