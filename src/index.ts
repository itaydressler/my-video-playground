import {MainRouter} from './routes/index';
import {setupMongooseConnection} from './database/index';

setupMongooseConnection();
MainRouter.setup();