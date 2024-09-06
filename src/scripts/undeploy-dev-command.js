import { REST, Routes } from "discord.js";
import fs from "fs";
import logger from "../utils/logger.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());
const rest = new REST().setToken(SECRETS.TOKEN);

try {
    if (!process.argv[2]) throw new Error("Command ID is not specified");
    if (!CONFIG.guilds.dev.guild) throw new Error("devGuild is not set in config.json");
    logger.log(`Started undeploying dev slash command: ${process.argv[2]}`);
    await rest.delete(
        Routes.applicationGuildCommand(SECRETS.APPLICATION_ID, CONFIG.guilds.dev.guild, process.argv[2])
    );
    logger.log(`Successfully undeployed dev slash command.`);
} catch (e) {
    logger.error(`Failed to undeploy dev slash command: ${e}`);
}

