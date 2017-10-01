import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {Express} from 'express';
import dishRouter from './dishRouter';

const DEFAULT_PORT = 5000;

export class MainRouter {
	public static setup() {
      const app = express();

      this.setPort(app);
	  this.setupUtilities(app);
	  this.setupCustomRouters(app);

	  this.setupMockRoute(app);
      this.setupDefaultRoute(app);
	  this.setupInitializationActions(app);
    }

    private static setPort(app:Express) {
	  const {PORT} = process.env;
      if (!PORT) {
        console.warn('No port defined for env, using ' + DEFAULT_PORT);
	  }
      app.set('port', (PORT || DEFAULT_PORT));
	}

	private static setupUtilities(app:Express) {
      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
	}

	private static setupCustomRouters(app: Express) {
	  app.use('/dishes', dishRouter)
	}

	private static setupDefaultRoute(app: Express) {
      app.use((req, res, next) => {
        res.status(404);
        next(new Error('Not Found'));
      });
	}

	private static setupMockRoute(app: Express) {
      app.get('/test', (request, response) => {
        response.json({"foo": "bar5"});
      });
	}

	private static setupInitializationActions(app: Express) {
      app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
      });
	}
}