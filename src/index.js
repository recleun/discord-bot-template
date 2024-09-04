import { Client, Colors, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import fs from "fs";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
	await loadGuilds(CONFIG.guilds.dev.guild, "devGuild");
	if (client.devGuild) {
		await loadChannel(CONFIG.channels.dev.logs, "devLogs");
		await loadChannel(CONFIG.channels.dev.errors, "devErrors");
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
	console.log(`[LOG] Logged in as ${readyClient.user.username}`);
});

async function loadGuilds(guildId, guildName) {
	if (guildId) {
		try {
			const devGuild = await client.guilds.fetch(guildId)
			client[guildName] = devGuild;
			console.log(`[LOG] ${guildName}: ${client[guildName].name} ${client[guildName].id}`);
		} catch (e) {
			console.error(`[ERR] Error while fetching ${guildName}: ${e}`);
		}
	} else {
		console.warn(`[WARN] devGuild is not set in config.json!`);
	}
}

async function loadChannel(channelId, channelName) {
	if (channelId) {
		try {
			const devChannel = await client.devGuild.channels.fetch(channelId);
			client[channelName] = devChannel;
			console.log(`[LOG] ${channelName}: #${client[channelName].name} (${client[channelName].id})`);
		} catch (e) {
			console.error(`[ERR] Error while fetching ${channelName}: ${e}`);
		}
	} else if (channelId) {
		console.warn(`[WARN] ${channelName} is not set in config.json!`);
	}
}

client.login(SECRETS.TOKEN);
