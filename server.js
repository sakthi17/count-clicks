var express = require('express');
var app_router = require('./routes/routes.js');
/* required to get logo image placed in assets folder in Glitch */
var assets = require('./assets');
var mongodb = require('mongodb');
var morgan = require('morgan');

//mongodb://<dbuser>:<dbpassword>@<host>:<port>/<dbname>
var uri = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PWD +"@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/"+ process.env.DB;

var app = express();

mongodb.MongoClient.connect(uri,function(err,client){
  if (err) {
		throw new Error('Database failed to connect!');
	}
  else {
		console.log('MongoDB successfully connected on port '+ process.env.PORT);
	}
  var db = client.db(process.env.DB);
   
  app.use('/assets', assets);
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controller', express.static(process.cwd() + '/controller'));
  app.use(morgan(':method :url :status'));
  app_router(app,db);

  var listener = app.listen(process.env.PORT,function(){
    console.log('Your APP has started in port ' + listener.address().port);
  });

});

