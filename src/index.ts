
import {setupMongooseConnection} from './database/index';
import {setupMainRouter} from './routes/index';

setupMongooseConnection();
setupMainRouter();