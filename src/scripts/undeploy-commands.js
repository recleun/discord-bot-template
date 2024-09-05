import { REST, Routes } from "discord.js";
import fs from "fs";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());

const rest = new REST().setToken(SECRETS.TOKEN);

try {
	console.log(`[LOG] Started undeploying all global slash commands.`);
	await rest.put(
		Routes.applicationCommands(SECRETS.APPLICATION_ID),
		{ body: [] },
	);
	console.log(`[LOG] Successfully undeployed all global slash commands.`);
} catch (e) {
	console.error(`[ERR] Failed to undeploy global slash commands: ${e}`);
}

