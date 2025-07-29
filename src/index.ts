import ConnectToDB from "./config/db";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';


const app = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello There! Welcome to backendOne');
});
app.use('/api/user', userRouter);
const PORT = process.env.PORT || 5000;
ConnectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });

}).catch((error) => {
    console.error("failed to connect to database:", error);
});



export default app;
