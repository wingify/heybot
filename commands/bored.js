var request = require('request');

module.exports = function (session, arguments) {
	request({
		url: 'http://api.icndb.com/jokes/random?limitTo=%5Bnerdy%5D',
	}, function(error, response, body) {
		if (error || response.statusCode !== 200) {
			session.send('Go get a hobby! I got work!');
			return;
		}
		try {
			var data = JSON.parse(body);
			session.send(data.value.joke);
		} catch(e) {
			session.send('Go get a hobby! I got work!');
		}
	});
};