<p align="center">
<img src="http://engineering.wingify.com/heybot/logo.svg" alt="Heybot! Logo" height="200">
</p>

# Heybot!
*A sleek command based Skype chat bot for your team*

## About

**Heybot!** is a bot that came up from our own requirement at [Wingify](https://wingify.com) to enable everyone to run automated tasks easily from Skype chats. It gives you a simple framework to write commands that your team can run, with provision of restricted access to some commands by [power users only](/docs/writing-commands.md#restricting-a-command-to-certain-users).

Its written over Microsoft's [bot framework](https://dev.botframework.com/), designed to be extensible for any sort of task in small and large teams. Bot framework based bots work out of the box with Skype, but the same bots can act as a base for a Messenger, slack etc bot too. As of now, *Heybot!* has been tested on Skype only and the instructions here are for Skype.

## Setup

- Clone this repository.
- Run `npm install` to install all node dependencies.
- Copy `creds.template.js` to `creds.js` and replace the parameters with appropriate values. [Read more](https://docs.botframework.com/en-us/csharp/builder/sdkreference/gettingstarted.html#registering). You can also have the same parameters as environment variables instead of putting them in creds.js. Note that `creds.js` must still exist.
- Add valid SSL certificate files in the repository. Those files are read by `app.js`. The names of the files should be `ssl.key` & `ssl.crt`. This is required because the server must be running on valid secure endpoint.
- Run `npm start` to run the bot server. Similarly you can stop by running `npm stop`.
- Congratulations! You should now have **Heybot!** running successfully! You can now add your bot to Skype from [your bot page](https://dev.botframework.com/bots).

**Important**: As the bot you'll register with Microsoft would be for your team and won't be of much use to general users, you'll need to keep it in preview mode instead of publishing it to the marketplace. Though, note that in preview mode the maximum number of chats the bot can be added to is limited (100 currently). You can make the best use of this limit by adding the bot only to group chats instead of everyone adding it on personal chats. Hopefully, Microsoft will enable us to have private bots in future.

## Using Heybot!

Running any command on **Heybot!** is as simple as saying the command name prefixed with `!`.

Eg. to run the `ping` command, you need to type: `!ping` (or `@yourbotname !ping` if on a group chat).

To see list of all available commands, say `help` (without the !)

![Chat screen](/chatscreen.png)

## Third party commands

- [Command_Name](https://github.com/wingify/some-command) - A one line intro about the command.

If you have written a useful or fun command for *Heybot!*, open up a pull request adding your command to the above list with a link to your github repository.

[Read about writing your own commands](/docs/writing-commands.md).

## Development

[Read docs](/docs/) for how **Heybot!** works internally.

## References
- [Botframework API reference](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html)

## Maintainers

- [Kushagra Gour](https://github.com/chinchang/)
