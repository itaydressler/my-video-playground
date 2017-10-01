import {connect, connection} from 'mongoose';

export const setupMongooseConnection = () => {
  const mongoUrl = process.env.MONGODB_URI;

  if (mongoUrl) {
    console.log("Connecting to " + mongoUrl);
    connect(mongoUrl);

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function () {
      // we're connected!
      console.log("Connected correctly to server");
    });
  }
  else {
    console.log('No mongo url detected.');
  }
};



