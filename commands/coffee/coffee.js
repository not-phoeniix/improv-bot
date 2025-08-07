const { SlashCommandBuilder } = require("discord.js");
const dataManager = require("../../data_manager.js");

const data = new SlashCommandBuilder()
    .setName("coffee")
    .setDescription("Answers the current coffee prompt with a pun !!")
    .addStringOption(option => {
        option.setName("pun");
        option.setDescription("Pun to answer current prompt with");
        option.setRequired(true);
        return option;
    });

async function execute(interaction) {
    const { prevPrompt } = dataManager.getData("coffee.json", interaction);
    const pun = interaction.options.getString("pun");

    await interaction.reply(
        `i like my lovers like i like my **${prevPrompt}**...\n` +
        `> "${pun}" ~ <@${interaction.member.id}>`
    );
}

module.exports = { data, execute }