
import * as jwt from 'jsonwebtoken';
import {IBasicUserData, IUser} from '../../models/users';
import {Response, NextFunction} from 'express';
import Request from '../Types/Request';
import {isPlainObject} from 'lodash';

const SECRET_KEY = '12345-67890-09876-54321';

export class Verify {
  public static getToken(user: IBasicUserData) {
    if (!user) {
      throw new Error('Must send an object to create a token.');
    }

    return jwt.sign(user, SECRET_KEY, {
      expiresIn: 3600
    })
  }

   public static verifyOrdinaryUser(req:Request, res:Response, next:NextFunction) {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, SECRET_KEY,  (err, decodedUser: IBasicUserData) => {
        if (err) {
          res.status(401);
          return next(new Error('You are not authenticated!'));
        } else {
          req.user = decodedUser;
          next();
        }
      });
    }
    else {
      res.status(403);
      return next(new Error('You gotta authenticate for this to work dude, please provide a token.'));
    }
  };

  public static verifyAdmin(req:Request, res:Response, next:NextFunction) {
    if (req.user && req.user.isAdmin) {
      next();
    }
    else {
      res.status(403);
      return next(new Error('You are not authorized to do this.'));
    }
  }
}
