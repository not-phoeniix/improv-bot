const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require("discord.js");
const fs = require("node:fs");
const commands = require("./commands_manager.js");
const dataManager = require("./data_manager.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// create data dir if it doesn't exist
if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}

// register and set up client :D

client.once(Events.ClientReady, client => {
    console.log(`Client "${client.user.tag}" ready !!`);
});

client.login(process.env.DISCORD_TOKEN);

// set up commands !!

commands.forEachCommand(c => client.commands.set(c.data.name, c));

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Command "${interaction.commandName}" not found!`);
        return;
    }

    try {
        if (interaction.guildId) {
            dataManager.setupGuild(interaction.guildId);
        } else {
            console.error("Cannot set up guild! guild ID is not valid!");
        }

        await command.execute(interaction);
    } catch (err) {
        console.error(err);

        const message = {
            content: "There was an error while executing this command!",
            flags: MessageFlags.Ephemeral
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(message);
        } else {
            await interaction.reply(message);
        }
    }
});
