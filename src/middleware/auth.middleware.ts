import jwt from 'jsonwebtoken';
import {Response, NextFunction} from 'express';
import {Iuser} from '../interfaces/user.interface';
import {Iadmin} from '../interfaces/admin.interface';
import IRequest from '../interfaces/req.interface';



interface JwtPayLoad {
    id: string;
    role: 'User' | 'Admin';
}


export const authMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;

    //Now to check if token is present 
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: 'No token'});
    }

    //Now we must extract the token from the header 
    const token = authHeader.split(' ')[1];

    //Then we verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayLoad;

    //We then attatch the decoded information to the request 
    req.user = {
        _id: decoded.id,
        role: decoded.role } as Iuser | Iadmin;
        req.token = token;
    //We call next() to continue to next function in the route.
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
};
