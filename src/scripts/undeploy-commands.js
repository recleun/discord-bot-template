import { REST, Routes } from 'discord.js';
import fs from 'fs';
import logger from '../utils/logger.js';

const SECRETS = JSON.parse(fs.readFileSync('./secrets.json').toString());
const rest = new REST().setToken(SECRETS.TOKEN);

try {
    logger.log(`Started undeploying all global slash commands.`);
    await rest.put(
        Routes.applicationCommands(SECRETS.APPLICATION_ID),
        { body: [] },
    );
    logger.log(`Successfully undeployed all global slash commands.`);
} catch (e) {
    logger.error(`Failed to undeploy global slash commands: ${e}`);
}

