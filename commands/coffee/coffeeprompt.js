const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffeeprompt")
    .setDescription("Picks a new random coffee prompt !!");

async function execute(interaction) {
    const data = dataManager.getData("coffee.json", interaction);

    // ensure same prompt is never picked twice in a row
    let prompt = "";
    do {
        const idx = Math.floor(Math.random() * data.prompts.length);
        prompt = data.prompts[idx];
    } while (prompt == data.prevPrompt);

    data.prevPrompt = prompt;
    dataManager.setData("coffee.json", data, interaction);

    await interaction.reply(`i like my lovers like i like my **${prompt}**...`);
}

module.exports = { data, execute }
