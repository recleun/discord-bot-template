import { Client, Colors, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import fs from "fs";
import { loadGuilds, loadChannel } from "./utils/functions.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
	console.log(`[LOG] Logged in as ${readyClient.user.username}`);
});

client.login(SECRETS.TOKEN);

