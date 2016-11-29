module.exports = function (session) {
	session.send('Ramukaka loves ' + session.message.user.name + ' (hug)');
};
