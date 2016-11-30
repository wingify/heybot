module.exports = function (session) {
	session.send('Heybot loves ' + session.message.user.name + ' (hug)');
};
