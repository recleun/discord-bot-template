import fs from "fs";
import path from "path";

export async function loadGuilds(guildId, guildName, client) {
	if (!guildId) console.warn(`[WARN] devGuild is not set in config.json!`);
	try {
		const devGuild = await client.guilds.fetch(guildId)
		client[guildName] = devGuild;
		console.log(`[LOG] ${guildName}: ${client[guildName].name} ${client[guildName].id}`);
	} catch (e) {
		console.error(`[ERR] Error while fetching ${guildName}: ${e}`);
	}
}

export async function loadChannel(channelId, channelName, client) {
	if (!channelId) return console.warn(`[WARN] ${channelName} is not set in config.json!`);
	try {
		const devChannel = await client.devGuild.channels.fetch(channelId);
		client[channelName] = devChannel;
		console.log(`[LOG] ${channelName}: #${client[channelName].name} (${client[channelName].id})`);
	} catch (e) {
		console.error(`[ERR] Error while fetching ${channelName}: ${e}`);
	}
}

/**
	* @returns {Promise<String[]>}
	*/
export async function loadCommands(commandsPath, accumulated = []) {
	const commands = [...accumulated];
	const files = fs.readdirSync(commandsPath);
	for (let i = 0; i < files.length; i++) {
		if (files[i].endsWith(".js")) {
			const commandPath = path.join(commandsPath, files[i]);
			try {
				const command = (await import(commandPath)).command;
				if (!command.data || !command.execute) {
					throw new Error("Command missing data propery or execute method");
				}
				commands.push(path.join(commandsPath, files[i]));
			} catch (e) {
				const commandName = commandPath.split("/");
				console.error(`[ERR] Failed to load the command ${commandName[commandName.length-1]}: ${e}`);
			}
		} else {
			commands.push(...loadCommands(path.join(commandsPath, files[i]), accumulated));
		}
	}
	return commands;
}
