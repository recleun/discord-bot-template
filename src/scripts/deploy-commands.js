import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { loadCommands } from "../utils/functions.js";
import logger from "../utils/logger.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const commands = [];
const commandFiles = await loadCommands(path.join(import.meta.dirname, "../commands"));

for (const file of commandFiles) {
     commands.push((await import(file)).command.data.toJSON());
}

const rest = new REST().setToken(SECRETS.TOKEN);

try {
    if (commands.length == 0) throw new Error("No commands to deploy: commands folder is empty");
    logger.log(`Started globally deploying ${commands.length} slash commands.`);
    const data = await rest.put(
        Routes.applicationCommands(SECRETS.APPLICATION_ID),
        { body: commands },
    );
    logger.log(`Successfully deployed ${data.length} global slash commands.`);
} catch (e) {
    logger.error(`Failed to deploy global slash commands: ${e}`);
}

