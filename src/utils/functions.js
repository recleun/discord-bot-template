import { CommandInteraction } from "discord.js";
import fs from "fs";
import path from "path";
import logger from "../utils/logger.js";

export async function loadGuilds(guildId, guildName, client) {
	if (!guildId) logger.warn(`devGuild is not set in config.json!`);
	try {
		const devGuild = await client.guilds.fetch(guildId)
		client[guildName] = devGuild;
		logger.log(`${guildName}: ${client[guildName].name} ${client[guildName].id}`);
	} catch (e) {
		logger.error(`Error while fetching ${guildName}: ${e}`);
	}
}

export async function loadChannel(channelId, channelName, client) {
	if (!channelId) return logger.warn(`${channelName} is not set in config.json!`);
	try {
		const devChannel = await client.devGuild.channels.fetch(channelId);
		client[channelName] = devChannel;
		logger.log(`${channelName}: #${client[channelName].name} (${client[channelName].id})`);
	} catch (e) {
		logger.error(`Error while fetching ${channelName}: ${e}`);
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
				logger.error(`Failed to load the command ${commandName[commandName.length-1]}: ${e}`);
			}
		} else {
			commands.push(...loadCommands(path.join(commandsPath, files[i]), accumulated));
		}
	}
	return commands;
}

/**
	* @param {CommandInteraction} interaction
	* @returns {String}
	*/
export function parseCommandLog(interaction) {
	return `/${interaction.commandName} - @${interaction.user.username} (${interaction.user.id})`;
}

