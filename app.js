var restify = require('restify');
var builder = require('botbuilder');
var creds = require('./creds.js');
var fs = require('fs');
var addresses = require('./addresses.js');
var sharedSecret = process.env.sharedSecret || creds.sharedSecret;

//=========================================================
// Bot Setup
//=========================================================

var httpsOptions = {
	key: fs.readFileSync('./ssl.key'), // in current folder
	certificate: fs.readFileSync('./ssl.crt')
};
// Setup Restify Server
var server = restify.createServer(httpsOptions);
server.use(restify.bodyParser());

server.listen(443 || process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
	appId: process.env.microsoftAppId || creds.microsoftAppId,
	appPassword: process.env.microsoftAppPassword || creds.microsoftAppPassword
});
var bot = new builder.UniversalBot(connector);

// For skype
server.post('/api/messages', connector.listen());

// For proactive messaging
server.post('/message', function create(req, res, next) {
	if (req.body.shared_secret !== sharedSecret) {
		res.send(403, ':P Sorry!');
		return;
	}
	if (!addresses[req.body.to]) {
		res.send(404, '');
		return;
	}
	sendMessage(req.body.to, req.body.message)
	res.send(200, '');
});

/**
 * Route handler for sending proactive messages
 * @param  {string} recipient key of recipient as in addresses.js
 * @param  {string} message   message to send
 */
function sendMessage(recipient, message) {
	var address = addresses[recipient];
	var msg = new builder.Message()
		.text(message)
		.address(address);

	bot.send(msg);
}

//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

// Handler for any command starting with a !
function onCommand(session) {
	var msg = session.message.text;
	console.log('matched command', msg)

	var match = msg.match(/!(\w+)(.*)/);
	var command = match[1],
		args = match[2] || '';
	try {
		var module = require('./commands/' + command + '.js');
		module(session, args.trim().split(/\s+/));
	} catch(e) {
		console.log(e);
		session.send('I wish that was a command :(')
	}
}

// Detect a `!` prefixed message which acts as command trigger.
intents.matches(/!\w+/i, onCommand);

function onWelcome (session) {
	session.send('Thank you ' + session.message.user.name.split(' ')[0]);
}
intents.matches(/welcome/i, onWelcome);

/**
 * Return the list of available commands
 * @param  {object} session Session object received in intent handler
 */
function onHelp (session) {
	fs.readdir('commands', function(err, files) {
		if (err) return;
		var msg = '';
		files = files.map(function(f) {
			return f.replace(/\.js/, '');
		});
		session.send('**Commands available**:\n\n' + files.join(', '));
	});
}

intents.onDefault(function (session, results) {
	var recvMsg = session.message.text;

	// HACK: FOllowing if-else conditions are to call appropriate handlers when
	// message is sent from groups because intents are not working on their own
	// for group messaging.
	// https://github.com/Microsoft/BotBuilder/issues/1225
	if (recvMsg.match(/!\w+/)) {
		onCommand(session);
		return;
	} else if (recvMsg.match(/welcome/)) {
		onWelcome(session);
		return;
	} else if (recvMsg.match(/help/)) {
		onHelp(session);
		return;
	}

	// If nothing messages, send Hello message :)
	var msg = new builder.Message(session)
	.text('Hello %s', session.message.user.name);

	session.send(msg);
});
