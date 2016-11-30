var request = require('request');

module.exports = function (session, arguments) {
	var currency = arguments[0] || 'INR';
	currency = currency.toUpperCase();

	if (currency === 'HELP') {
		session.send('Usage: !bitcoin [currency_symbol]')
		return;
	}

	request({
		url: 'http://api.bitcoincharts.com/v1/weighted_prices.json',
	}, function(error, response, body) {
		if (error || response.statusCode !== 200) return;
		try {
			var data = JSON.parse(body);
			session.send(data[currency]['24h']);
		} catch(e) {
			session.send('Sorry Sir, not able to query that.');
		}
	});
};