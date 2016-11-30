var powerUsers = require('../powerUsers.js');

module.exports = function (session, args) {

    var user = session.message.user;
    if (!powerUsers[user.id]) {
        // User isn't a power user
        session.send('With great power comes great responsibility. Next time.');
        return;
    }

    // Do your work here...
    session.send('Sure ' + getFirstName(user.name) + '. I will do that');
};