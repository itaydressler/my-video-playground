
import * as jwt from 'jsonwebtoken';
import {IUser} from '../../models/users';
import {Response, NextFunction} from 'express';
import Request from '../Types/Request';

const SECRET_KEY = '12345-67890-09876-54321';

export class Verify {
  public static getToken(user: IUser) {
    return jwt.sign(user, SECRET_KEY, {
      expiresIn: 3600
    })
  }

   public static verifyOrdinaryUser(req:Request, res:Response, next:NextFunction) {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, SECRET_KEY, function (err, decodedUser: IUser) {
        if (err) {
          res.status(401);
          return next(new Error('You are not authenticated!'));
        } else {
          // if everything is good, save to request for use in other routes
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
}
