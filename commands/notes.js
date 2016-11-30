module.exports = function (session, args) {
	var command = args[0];
	if (!command || command === 'help') {
		session.send('Usage: !notes show|clear|[Note]')
		return;
	}
	if (command === 'show') {
		try {
			var notes = session.userData.notes.map(function (note) {
				return '- ' + note;
			}).join('\n');
			session.send(notes);
		} catch(e) {
			session.send('No notes saved.');
		}
		return;
	} else if (command === 'clear') {
		session.userData.notes = '';
		session.send('Notes cleared.');
		return;
	}

	var note = args.join(' ');
	session.userData = session.userData || {};
	session.userData.notes = session.userData.notes || [];
	session.userData.notes.push(note);
	session.send('Note saved');
};
