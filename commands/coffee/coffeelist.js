const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("coffeelist")
    .setDescription("Lists all coffee prompts for this server");

async function execute(interaction) {
    const { prompts } = require("../../data/coffee.json");

    let reply = "Current **COFFEE** prompts:\n";

    for (let prompt of prompts) {
        reply += `- ${prompt}\n`;
    }

    await interaction.reply(reply);
}

module.exports = { data, execute }
