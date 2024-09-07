import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { loadCommands } from "../utils/functions.js";
import logger from "../utils/logger.js";

const SECRETS = JSON.parse(fs.readFileSync("./secrets.json").toString());
const CONFIG = JSON.parse(fs.readFileSync("./config.json").toString());
const commands = [];
const commandFiles = await loadCommands(
  path.join(import.meta.dirname, "../dev"),
);

for (const file of commandFiles) {
  commands.push((await import(file)).command.data.toJSON());
}

const rest = new REST().setToken(SECRETS.TOKEN);

try {
  if (!CONFIG.guilds.dev.guild) {
    throw new Error("devGuild is not set in config.json");
  }
  if (commands.length === 0) {
    throw new Error("No commands to deploy: dev folder is empty");
  }
  logger.log(`Started globally deploying ${commands.length} slash commands.`);
  const data = await rest.put(
    Routes.applicationGuildCommands(
      SECRETS.APPLICATION_ID,
      CONFIG.guilds.dev.guild,
    ),
    { body: commands },
  );
  logger.log(`Successfully deployed ${data.length} global slash commands.`);
} catch (e) {
  logger.error(`Failed to deploy global slash commands: ${e}`);
}
