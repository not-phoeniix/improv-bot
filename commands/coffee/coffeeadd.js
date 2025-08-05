const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffeeadd")
    .setDescription("Adds a new coffee prompt for this server")
    .addStringOption(option => {
        option.setName("prompt");
        option.setDescription("The new coffee prompt you'd like to add");
        option.setRequired(true);
        return option;
    });

async function execute(interaction) {
    const data = dataManager.getData("coffee.json", interaction);
    const prompt = interaction.options.getString("prompt");

    if (data.prompts.findIndex(v => v == prompt) == -1) {
        data.prompts.push(prompt);

        dataManager.setData("coffee.json", data, interaction);

        await interaction.reply(`Added prompt **${prompt}**!`);

    } else {
        await interaction.reply(`Can't add prompt **${prompt}**, it's already been added!`);
    }
}

module.exports = { data, execute };
