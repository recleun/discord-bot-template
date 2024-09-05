# discord-bot-template
A template to speed up the process of setting up bots, with some useful features on the side.

## Prerequisites
- Basic understanding of [JavaScript](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://eloquentjavascript.net/&ved=2ahUKEwiYw6e_sqqIAxWNgP0HHQXoNRkQFnoECAgQAQ&usg=AOvVaw2HqtTANHMsp-padDowNV2O).
(So you're able to use the template and add your own features/commands)
- Basic understanding of git.
(Just to clone, version control is up to you)
- Basic understanding of [Discord.JS](https://discord.js.org).
(So you understand how to work with this template)

## Usage
### First Steps

Clone/fork this repository to your device, then do the following:

1. Rename `example.secrets.json` to `secrets.json`. (It is already included in `.gitignore`)
2. In `secrets.json`, put your bot token in the `TOKEN` field.
3. In `secrets.json`, put your bot application ID in the `APPLICATION_ID` field.
4. Rename `example.config.json` to `config.json`.
5. You are pretty much ready to go, but it is heavily recommended to do the following steps.
6. Fill in `guilds.dev.guild` with your guild ID (server ID). This will have your main development features, like logging, and errors will be printed here too.
7. After you specify the development guild ID, you need to specify the channel ID for logging (`channels.dev.logs`) and errors (`channels.dev.errors`).
8. Please not that steps 5-7 are completely optional, but they are heavily recommended, and not doing them will cause a warning when the bot starts.

### Scripts

To run an npm script, use the command `npm run script` where script is the name of your script.

#### Available Scripts
`start`: Starts the bot, by running the src/index.js file.

`deploy`: Deploys all the commands under the `commands` folder.[<sup>1</sup>](https://github.com/recleun/discord-bot-template#1-any-javascript-js-file-is-considered-a-command-even-if-its-in-a-folder-as-long-as-its-under-the-commands-folder)

`deploy-dev`: Deploys all the commands under the `dev` folder.[<sup>2</sup>](https://github.com/recleun/discord-bot-template#2-same-as-first-point-any-javascript-js-file-is-considered-a-command-even-if-its-in-a-folder-as-long-as-its-under-the-dev-folder)

`undeploy-all-global`: Undeploys all commands that are deployed globally.

`undeploy-global`: Undeploys only the specified global command ID.[<sup>3</sup>](https://github.com/recleun/discord-bot-template#3-syntax-for-undeploy-global-and-undeploy-dev-is-npm-run-script-id-where-script-is-the-name-of-the-script-and-id-is-the-command-id)

`undeploy-all-dev`: Undeploys all dev that are deployed on the dev guild.

`undeploy-dev`: Undeploys only the specified command ID on the dev guild.

###### 1. Any JavaScript (`.js`) file is considered a command (even if it's in a folder) as long as it's under the `commands` folder.
###### 2. Same as first point, any JavaScript (`.js`) file is considered a command (even if it's in a folder) as long as it's under the `dev` folder.
###### 3. Syntax for `undeploy-global` and `undeploy-dev` is `npm run script id` where script is the name of the script and id is the command ID.
