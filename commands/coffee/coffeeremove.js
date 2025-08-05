const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

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
    const data = require("../../data/coffee.json");
    const prompt = interaction.options.getString("prompt");

    const index = data.prompts.findIndex(v => v == prompt);

    if (index != -1) {
        data.prompts.splice(index);

        console.log("backing up old coffee file...");
        fs.copyFileSync("./data/coffee.json", "./data/coffee.json.bak");
        console.log("writing new coffee file...");
        fs.writeFileSync("./data/coffee.json", JSON.stringify(data, null, 4));

        await interaction.reply(`Removed prompt **${prompt}**!`);

    } else {
        await interaction.reply(`Can't find prompt **${prompt}**, it was never added!`);
    }
}

module.exports = { data, execute };
