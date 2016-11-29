### Command File

**Heybot!** commands are just usual JavaScript files. For a command `x`, add a file called `x.js` in `commands/` folder.

Eg. for a command that can be invoked as `!hello`, you must have a file called `commands/hello.js`.

### Command file structure

```
// This function will be run whenever this command is accessed
module.exports = function (session, arguments) {
	// Bot code here
};
```

### Sending messages

```
module.exports = function (session, arguments) {
	session.send('Hello world');
};
```

Getting user name

```
module.exports = function (session, arguments) {
	session.send('Hello ' + session.message.user.name);
	// Also has user id at `session.message.user.id`
};
```

### Reading command arguments

Arguments passed to the command are available in `arguments` array.

Eg. if a command was invoked as `!command 123 abc`, the `arguments` array would be `[ 123, abc ]`.

### Asynchronous work

```
var req = require('request');

module.exports = function (session, arguments) {
	session.send('Hang tight...');
	req({
		url: 'http://someurl.com/endpoint'
	}, function () {
		session.send('Work done!');
	})
};
```

### Restricting a command to certain users

*Heybot!* gives you a way to restrict commands to certain users only. You can simply add your power users to the file `powerUsers.js`. And then you can simply check the user who ran the command if he is in that list or not.

[See a sample power user command](/commands/powerusercommand.js)

### Running a Jenkins job from a command

[See a sample jenkins job command](/commands/jenkins.js)

Note that just running a jenkins job is not enough. You would, in most cases, need a return message too from jenkins that the job was completed successfully or failed. For this, you can use the proactive messaging API in *Heybot!*.

[Read more about proactive messaging](/docs/proactive-messaging.md)

### References

- [Botframework Chat API reference](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html)