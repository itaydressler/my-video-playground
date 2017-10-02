import {Router} from 'express';
import {IUser, Users} from '../models/users';
import * as passport from 'passport';
import {Verify} from './Utils/verify';

const usersRouter = Router();
const baseRoute = usersRouter.route('/');
const itemRoute = usersRouter.route('/:itemId');

baseRoute.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  Users.find({}, (err, users) => {
    if (err) {
      next(err);
      return;
    }
    res.json(users);
  })
});

usersRouter.post('/register', (req, res, next) => {
  Users.register(new Users({ username : req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        return res.status(500).json({err: err});
      }
      passport.authenticate('local')(req, res, () => {
        return res.status(200).json({status: 'Registration Successful!'});
      });
    });
});

usersRouter.post('/login',(req, res, next) => {
  passport.authenticate('local', (err, user: IUser, info) => {
    console.log('Authenticated ');
    console.log(user);
    if (err) {
      console.error('Got error');
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.error('no user');
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Got error 2 ');
        console.error(err);
        res.status(500);
        return next(err);
      }

      const token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

usersRouter.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

itemRoute.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  Users.findById(req.body.itemId, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
});

export default usersRouter;