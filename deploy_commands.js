const { REST, Routes } = require("discord.js");
const commands = require("./commands_manager.js");
require("dotenv").config();

// create a rest module !!
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

const commandsJson = [];
commands.forEachCommand(c => commandsJson.push(c.data.toJSON()));

// deploy commands !!
(async () => {
    try {
        console.log(`began deploying ${commandsJson.length} slash (/) commands...`);

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_APP_ID),
            {
                body: commandsJson
            }
        );

        console.log("commands deployed !!!");

    } catch (err) {
        console.log(err);
    }
})();
