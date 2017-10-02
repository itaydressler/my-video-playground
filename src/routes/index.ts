import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Express} from 'express';
import dishRouter from './dishRouter';
import usersRouter from './users';
import * as passport from 'passport';
import {Strategy} from 'passport-local';
import {Users} from '../models/users';

const DEFAULT_PORT = 5000;

export const setupMainRouter = () => {
  const app = express();

  setPort(app);
  setupUtilities(app);
  setupCustomRouters(app);

  setupMockRoute(app);
  setupDefaultRoute(app);
  setupInitializationActions(app);
  setupErrorHandlers(app);
};

const setPort = (app:Express) => {
  const {PORT} = process.env;
  if (!PORT) {
    console.warn('No port defined for env, using ' + DEFAULT_PORT);
  }
  app.set('port', (PORT || DEFAULT_PORT));
};

const setupUtilities = (app:Express) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  setupPassportAuth(app);
};

const setupPassportAuth = (app: Express) => {
  app.use(passport.initialize());
  passport.use(new Strategy(Users.authenticate()));
  passport.serializeUser(Users.serializeUser());
  passport.deserializeUser(Users.deserializeUser());
};

const setupCustomRouters = (app: Express) => {
  app.use('/dishes', dishRouter);
  app.use('/users', usersRouter);
};

const setupDefaultRoute = (app: Express) => {
  app.use((req, res, next) => {
    res.status(404);
    next(new Error('API Not Found'));
  });
};

const setupMockRoute = (app: Express) => {
  app.get('/test', (request, response) => {
    response.json({"foo": "bar5"});
  });
};

const setupInitializationActions = (app: Express) => {
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });
};

const setupErrorHandlers = (app: Express) => {
  setupErrorHandlerForDev(app);
  setupErrorHandlerForProduction(app);
};

const setupErrorHandlerForDev = (app: Express) => {
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  }
};

const setupErrorHandlerForProduction = (app: Express) => {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
};
