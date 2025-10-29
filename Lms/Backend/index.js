
// npm install express mongoose dotenv jsonwebtoken cookie-parser bcryptjs validator cors 
import authRouter from './route/authRoute.js';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './route/userRoute.js';
dotenv.config();

// import authRouter from './route/authRoute.js';

const port = process.env.PORT 
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin :"http://localhost:5173",
    credentials:true, 
}))



app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)



app.get('/', (req, res) => {
    res.send('Hello from LMS Backend');
})


app.listen(port, () => {
    console.log(`LMS Backend is running on port ${port}`);
    connectDb()
})