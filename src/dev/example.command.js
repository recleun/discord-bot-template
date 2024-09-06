import { SlashCommandBuilder } from 'discord.js';
// import logger from '../utils/logger.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('dev-command-template')
        .setDescription('This is a dev command template that responds with pong.'),
    /**
    * @param {CommandInteraction} interaction
    */
    execute: async function(interaction) {
        return await interaction.reply('pong');
    }
}

