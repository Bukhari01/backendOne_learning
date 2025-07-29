import ConnectToDB from "./config/db";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';


const app = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello There! Welcome to backendOne');
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
const PORT = process.env.PORT || 4000;
ConnectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });

}).catch((error) => {
    console.error("failed to connect to database:", error);
});



export default app;
