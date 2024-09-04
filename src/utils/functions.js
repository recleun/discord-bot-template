export async function loadGuilds(guildId, guildName, client) {
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

export async function loadChannel(channelId, channelName, client) {
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

