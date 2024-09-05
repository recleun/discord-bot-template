import { REST, Routes } from "discord.js";
import fs from "fs";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());

const rest = new REST().setToken(SECRETS.TOKEN);

try {
	if (!process.argv[2]) throw new Error("Command ID is not specified");
	if (!CONFIG.guilds.dev.guild) throw new Error("devGuild is not set in config.json");
	console.log(`[LOG] Started undeploying dev slash command: ${process.argv[2]}`);
	await rest.delete(
		Routes.applicationGuildCommand(SECRETS.APPLICATION_ID, CONFIG.guilds.dev.guild, process.argv[2])
	);
	console.log(`[LOG] Successfully undeployed dev slash command.`);
} catch (e) {
	console.error(`[ERR] Failed to undeploy dev slash command: ${e}`);
}

