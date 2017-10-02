import {IBasicUserData, IUser} from '../../models/users';
import * as express from 'express';

interface Request extends express.Request {
  user?: IBasicUserData;
}

export default Request;