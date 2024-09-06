import { REST, Routes } from "discord.js";
import fs from "fs";
import logger from "../utils/logger.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());

const rest = new REST().setToken(SECRETS.TOKEN);

try {
	if (!CONFIG.guilds.dev.guild) throw new Error("devGuild is not set in config.json");
	logger.log(`Started undeploying all dev slash commands.`);
	await rest.put(
		Routes.applicationGuildCommands(SECRETS.APPLICATION_ID, CONFIG.guilds.dev.guild),
		{ body: [] },
	);
	logger.log(`Successfully undeployed all dev slash commands.`);
} catch (e) {
	logger.error(`Failed to undeploy dev slash commands: ${e}`);
}

