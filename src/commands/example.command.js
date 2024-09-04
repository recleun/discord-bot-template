import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = {
	data: new SlashCommandBuilder()
		.setName("command-template")
		.setDescription("This is a command template that responds with pong."),
	/**
	* @param {CommandInteraction} interaction
	*/
	execute: async function(interaction) {
		console.info(`[CMD] ${this.data.name} - ${interaction.user.username} (${interaction.user.id})`);
		return await interaction.reply("pong");
	}
}

