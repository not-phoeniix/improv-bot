const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

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
    const data = require("../../data/coffee.json");
    const prompt = interaction.options.getString("prompt");

    if (data.prompts.findIndex(v => v == prompt) == -1) {
        data.prompts.push(prompt);

        console.log("backing up old coffee file...");
        fs.copyFileSync("./data/coffee.json", "./data/coffee.json.bak");
        console.log("writing new coffee file...");
        fs.writeFileSync("./data/coffee.json", JSON.stringify(data, null, 4));

        await interaction.reply(`Added prompt **${prompt}**!`);

    } else {
        await interaction.reply(`Can't add prompt **${prompt}**, it's already been added!`);
    }
}

module.exports = { data, execute };
