import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';

/**
  * @description Loads a guild and add it to the `client` instance.
  * @param {String} guildId
  * @param {String} guildName
  * @param {Client} client
  * @returns {Promise<void>}
  */
export async function loadGuilds(guildId, guildName, client) {
    if (!guildId) { logger.warn(`devGuild is not set in config.json!`); }
    try {
        const devGuild = await client.guilds.fetch(guildId)
        client[guildName] = devGuild;
        logger.log(`${guildName}: ${client[guildName].name} ${client[guildName].id}`);
    } catch (e) {
        logger.error(`Error while fetching ${guildName}: ${e}`);
    }
}

/**
  * @description Loads a channel and adds it to the `client` instance.
  * @param {String} channelId
  * @param {String} channelName
  * @param {Client} client
  * @returns {Promise<void>}
  */
export async function loadChannel(channelId, channelName, client) {
    if (!channelId) { return logger.warn(`${channelName} is not set in config.json!`); }
    try {
        const devChannel = await client.devGuild.channels.fetch(channelId);
        client[channelName] = devChannel;
        logger.log(`${channelName}: #${client[channelName].name} (${client[channelName].id})`);
    } catch (e) {
        logger.error(`Error while fetching ${channelName}: ${e}`);
    }
}

/**
  * @description Goes through the path given and gets the path of all files ending with `.js`.
  * @param {String} commandsPath
  * @param {String[]} [accumulated=[]]
  * @returns {Promise<String[]>}
  */
export async function loadCommands(commandsPath, accumulated = []) {
    const commands = [...accumulated];
    const files = fs.readdirSync(commandsPath);
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.js')) {
            const commandPath = path.join(commandsPath, files[i]);
            try {
                const command = (await import(commandPath)).command;
                if (!command.data || !command.execute) {
                    throw new Error('Command missing data propery or execute method');
                }
                commands.push(path.join(commandsPath, files[i]));
            } catch (e) {
                const commandName = commandPath.split('/');
                logger.error(`Failed to load the command ${commandName[commandName.length-1]}: ${e}`);
            }
        } else {
            commands.push(...loadCommands(path.join(commandsPath, files[i]), accumulated));
        }
    }
    return commands;
}

/**
  * @description Parse a log through an `interaction` instance so it can be logged easily.
  * @param {CommandInteraction} interaction
  * @returns {String}
  */
export function parseCommandLog(interaction) {
    return `/${interaction.commandName} - @${interaction.user.username} (${interaction.user.id})`;
}

