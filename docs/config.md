# config.json Configuration
This page shall list all the fields provided in config.json so it's easy for the users to easily configure and set up their bot.

- Optional: This field is completely optional for the bot to function.
- Recommended: Offers useful features if set, as well as stability.
- Required: This field needs to be set for the bot to function.
- Needs: For this field to work, you need to set the needed fields first.

## guilds
The guilds field includes a list of guilds that are used by the bot. It is heavily recommended to set the `dev.guild` field.

### dev
This field includes a list of development-related guilds IDs.

##### guild
This is the main development guild ID, as said before, it is heavily recommended to set this, as it offers useful logging features, as well as being required in order to set logging channels.
###### (Optional, Recommended)

## channels
The channels field includes a list of channel IDs that are used by the bot. If you set the `guilds.dev.guild` field, then you should set all fields under `channels.dev`.

### dev
Development related channel IDs fall under this field.

##### logs
A channel ID (must be in the guild set in `guilds.dev.guild`) that will have various logs being sent there.
###### (Optional, Recommended, Needs: guilds.dev.guild)

##### errors
A channel ID (must be in the guild set in `guilds.dev.guild`). Same as logs, but will include errors instead. This could be set as the same channel as logs.
###### (Optional, Recommended, Needs: guilds.dev.guild)

