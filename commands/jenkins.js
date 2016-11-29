var request = require('request');
var creds = require('../creds.js')
// You can add your jenkins token to environment variables or creds.json.
var token = process.env.jenkinsToken || creds.jenkinsToken;

module.exports = function (session, args) {

	var branch = args[0];
	if (!branch || branch === 'help') {
		session.send('Usage: !buildbranch {branch_name}');
		return;
	}

	request({
		url: 'https://your-jenkins-url.com/job/jobname/buildWithParameters',
		method: 'POST',
		rejectUnauthorized: false,
		headers: {
			'Authorization': token
		},
		qs: {
			token: '#$()H#JH#J$', // As defined in your jenkins job configuration.
			BRANCH: branch, // custom job parameter
		},
	}, function(error, response, body) {
		if (error || (response.statusCode !== 201 && response.statusCode !== 302)) {
			session.send('Something went wrong.');
			return;
		}
		session.send('Build started on branch: [' + branch + '].');
	});
};

// To get a callback from jenkins when the job is completed, you can send a message back to any chat conversation using the proactive messaging API.