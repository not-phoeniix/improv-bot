const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffeelist")
    .setDescription("Lists all coffee prompts for this server");

async function execute(interaction) {
    const { prompts } = dataManager.getData("coffee.json", interaction);

    if (prompts.length == 0) {
        await interaction.reply("There are no coffee prompts set up yet!");
        return;
    }

    let reply = "Current **COFFEE** prompts:\n";

    for (let prompt of prompts) {
        reply += `- ${prompt}\n`;
    }

    await interaction.reply(reply);
}

module.exports = { data, execute }
