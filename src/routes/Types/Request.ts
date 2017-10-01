import {IUser} from '../../models/users';
import * as express from 'express';

interface Request extends express.Request {
  user?: IUser;
}

export default Request;