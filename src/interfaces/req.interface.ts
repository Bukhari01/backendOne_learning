import { Request } from 'express';
import { Iuser } from './user.interface';
import { Iadmin } from './admin.interface';


export default interface IRequest extends Request {
  user?: Iuser | Iadmin;
  token?: string;
}

