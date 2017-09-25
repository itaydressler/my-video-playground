var express = require('express');
var app = express();
const env : any = process.env;

app.set('port', (env.PORT || 5000));

app.get('/', function(request, response) {
  response.json({"foo": "bar"});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var mongoose = require('mongoose');
const mongoUrl = env.MONGODB_URI;

if (mongoUrl) {
	console.log("Connecting to " + mongoUrl);
	mongoose.connect(mongoUrl, err => console.log('Error connecting = ' + err));
}
else {
	console.log('Np mongo url detected');
}
