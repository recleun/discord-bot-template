import { REST, Routes } from "discord.js";
import fs from "fs";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());

const rest = new REST().setToken(SECRETS.TOKEN);

try {
	if (!process.argv[2]) throw new Error("Command ID is not specified");
	console.log(`[LOG] Started undeploying global slash command: ${process.argv[2]}`);
	await rest.delete(
		Routes.applicationCommand(SECRETS.APPLICATION_ID, process.argv[2])
	);
	console.log(`[LOG] Successfully undeployed global slash command.`);
} catch (e) {
	console.error(`[ERR] Failed to undeploy global slash command: ${e}`);
}

