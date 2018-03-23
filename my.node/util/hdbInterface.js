var hdb = require('hdb');
var client = hdb.createClient({
	host : '192.168.10.46',
	port : 30015,
	user : 'DEVUSER',
	password : 'Hzjs@123'
});

client.on('error', function(err) {
	console.error('Network connection error', err);
});

client.connect(function(err) {
	if (err) {
    return console.error('Connect error', err);
  }
  client.exec('select * from "GREEK_MYTHOLOGY"."PEOPLE" limit 10', function (err, rows) {
    client.end();
    if (err) {
      return console.error('Execute error:', err);
    }
    console.log('Results:', rows);
  });
});