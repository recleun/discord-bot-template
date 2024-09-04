import { CommandInteraction, Client, SlashCommandBuilder } from "discord.js";

export const command = {
	data: new SlashCommandBuilder()
		.setName("command-template")
		.setDescription("This is a command template that responds with pong."),
	/**
	* @param {Client} client
	* @param {CommandInteraction} interaction
	*/
	execute: async function(client, interaction) {
		console.info(`[CMD] ${this.data.name} - ${interaction.user.username} (${interaction.user.id})`);
		return await interaction.reply("pong");
	}
}

