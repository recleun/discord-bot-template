import { Client, Colors, EmbedBuilder, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { loadGuilds, loadChannel, loadCommands, parseCommandLog } from "./utils/functions.js";
import logger from "./utils/logger.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commands = await loadCommands(path.join(import.meta.dirname, "./commands"));
commands.push(...(await loadCommands(path.join(import.meta.dirname, "./dev"))));

for (const c of commands) {
	const command = (await import(c)).command;
	logger.log(`Loading command ${command.data.name}`)
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, async readyClient => {
	await loadGuilds(CONFIG.guilds.dev.guild, "devGuild", client);
	if (client.devGuild) {
		await loadChannel(CONFIG.channels.dev.logs, "devLogs", client);
		await loadChannel(CONFIG.channels.dev.errors, "devErrors", client);
	}
	if (client.devLogs) {
		const logEmbed = new EmbedBuilder()
			.setColor(Colors.Green)
			.setTitle("Bot online")
			.setTimestamp(Date.now());
		client.devLogs.send({
			embeds: [logEmbed],
		});
	}
	logger.log(`Logged in as ${readyClient.user.username}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		logger.error(`Command not found: ${parseCommandLog(interaction)}`);
		return;
	}
	try {
		await command.execute(interaction);
	} catch (e) {
		logger.error(`Command failed to execute: ${parseCommandLog(interaction)}`);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
		}
	}
});

client.login(SECRETS.TOKEN);

