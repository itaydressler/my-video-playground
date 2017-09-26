import * as express from 'express';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
const app = express();
const env : any = process.env;

app.set('port', (env.PORT || 5000));

app.get('/', function(request, response) {
  response.json({"foo": "bar2"});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const mongoUrl = env.MONGODB_URI;

if (mongoUrl) {
	console.log("Connecting to " + mongoUrl);
	mongoose.connect(mongoUrl,err => err && console.log('Error connecting = ' + err));
}
else {
	console.log('No mongo url detected');
}
