import { REST, Routes } from "discord.js";
import fs from "fs";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());

const rest = new REST().setToken(SECRETS.TOKEN);

try {
	console.log(`[LOG] Started undeploying all dev slash commands.`);
	await rest.put(
		Routes.applicationGuildCommands(SECRETS.APPLICATION_ID, CONFIG.guilds.dev.guild),
		{ body: [] },
	);
	console.log(`[LOG] Successfully undeployed all dev slash commands.`);
} catch (e) {
	console.error(`[ERR] Failed to undeploy dev slash commands: ${e}`);
}

