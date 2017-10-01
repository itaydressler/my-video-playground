import {Router} from 'express';
import {IUser, Users} from '../models/users';
import * as passport from 'passport';
import {Verify} from './Utils/verify';

const router = Router();
const baseRoute = router.route('/');
const itemRoute = router.route('/:itemId');

baseRoute.get(Verify.verifyOrdinaryUser, (req, res, next) => {
  Users.find({}, (err, users) => {
    if (err) {
      next(err);
      return;
    }
    res.json(users);
  })
});

router.post('/register', (req, res, next) => {
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

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user: IUser, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
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

router.get('/logout', (req, res) => {
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

export default router;