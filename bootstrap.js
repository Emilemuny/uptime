var mongoose   = require('mongoose');
var config     = require('config');

if (process.env.VCAP_SERVICES){
    srv = JSON.parse(process.env.VCAP_SERVICES);
    cred = srv['mongodb-1.8'][0].credentials;

    config.mongodb = {};
    config.mongodb.user = cred.user;
    config.mongodb.password = cred.password;
    config.mongodb.host = cred.hostname;
    config.mongodb.port = cred.port;
    config.mongodb.database = cred.db;

    config.port = config.udp_port = process.env.VCAP_APP_PORT;
    config.udp_address = process.env.VCAP_APP_HOST;
} else {
	console.log('No Database...', process.env.VCAP_SERVICES)
}

// configure mongodb
mongoose.connect(config.mongodb.connectionString || 'mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@' + config.mongodb.server + ':' + config.mongodb.port + '/' + config.mongodb.database);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application')
});

module.exports = mongoose;
