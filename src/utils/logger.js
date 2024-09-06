import { CommandInteraction } from "discord.js";
import { parseCommandLog } from "./functions";

export default {
    /**
    * @param {String} msg
    */
    log(msg) {
        console.log(`[LOG] ${msg}`);
    },
    /**
    * @param {String} msg
    */
    info(msg) {
        console.log(`[INFO] ${msg}`);
    },
    /**
    * @param {String} msg
    */
    error(msg) {
        console.error(`[ERR] ${msg}`);
    },
    /**
    * @param {String} msg
    */
    warn(msg) {
        console.warn(`[WARN] ${msg}`);
    },
    /**
    * @param {CommandInteraction} interaction
    */
    command(interaction) {
        console.log(`[CMD] ${parseCommandLog(interaction)}`);
    },
}

