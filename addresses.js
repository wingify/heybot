var addresses = {};
/**
 * Adds a address of a conversation which can be targeted proactively.
 * @param {string}  name    Identifier key for the conversation. Anything you like.
 * @param {string}  id      Conversation ID. Fetched from `session.message.address`.
 * @param {Boolean} isGroup Is this conversation group or not.
 */
function addAddress(name, id, isGroup) {
	addresses[name] = {
		channelId: 'skype',
		conversation: { id: id, isGroup: !!isGroup },
		serviceUrl: 'https://skype.botframework.com',
		useAuth: true
	};
}

// Example: To add a group conversation address, uncomment the following line and replace the conversation ID with yours.
// addAddress('testgroup', '19:37c701917e5745528bb290f8b2899801@thread.skype', true);

module.exports = addresses;