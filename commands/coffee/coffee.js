const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffee")
    .setDescription("Picks a new random coffee prompt !!");

async function execute(interaction) {
    const { prompts } = dataManager.getData("coffee.json", interaction);

    const idx = Math.floor(Math.random() * prompts.length);
    await interaction.reply(`i like my lovers like i like my **${prompts[idx]}**...`);
}

module.exports = { data, execute }
