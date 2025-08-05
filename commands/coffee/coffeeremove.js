const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffeeremove")
    .setDescription("Removes a previously-added coffee prompt from this server")
    .addStringOption(option => {
        option.setName("prompt");
        option.setDescription("The coffee prompt you'd like to remove");
        option.setRequired(true);
        return option;
    });

async function execute(interaction) {
    const data = dataManager.getData("coffee.json", interaction);
    const prompt = interaction.options.getString("prompt");

    const index = data.prompts.findIndex(v => v == prompt);

    if (index != -1) {
        data.prompts.splice(index);

        dataManager.setData("coffee.json", data, interaction);

        await interaction.reply(`Removed prompt **${prompt}**!`);

    } else {
        await interaction.reply(`Can't find prompt **${prompt}**, it was never added!`);
    }
}

module.exports = { data, execute };
