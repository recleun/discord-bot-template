import { parseCommandLog } from "./functions.js";

export default {
  /**
   * @description Used for basic logging.
   * @param {String} msg
   * @returns {void}
   */
  log(msg) {
    console.log(`[LOG] ${msg}`);
  },
  /**
   * @description Used for logging information.
   * @param {String} msg
   * @returns {void}
   */
  info(msg) {
    console.log(`[INFO] ${msg}`);
  },
  /**
   * @description Used for logging errors.
   * @param {String} msg
   * @returns {void}
   */
  error(msg) {
    console.error(`[ERR] ${msg}`);
  },
  /**
   * @description Used for logging warnings.
   * @param {String} msg
   * @returns {void}
   */
  warn(msg) {
    console.warn(`[WARN] ${msg}`);
  },
  /**
   * @description Used for logging command usages.
   * @param {CommandInteraction} interaction
   * @returns {void}
   */
  command(interaction) {
    console.log(`[CMD] ${parseCommandLog(interaction)}`);
  },
};
