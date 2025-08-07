const fs = require("node:fs");

function setupGuild(guildId) {
    const dirPath = `./data/${guildId}`;
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`creating data dir ${dirPath}...`);
    }

    const coffeePath = `${dirPath}/coffee.json`;
    if (!fs.existsSync(coffeePath)) {
        console.log(`creating initial coffee data file ${coffeePath}...`);
        fs.writeFileSync(coffeePath, JSON.stringify({
            prevPrompt: "",
            prompts: []
        }, null, 4));
    }
}

function getData(file, interaction) {
    const filePath = `./data/${interaction.guildId}/${file}`;

    if (fs.existsSync(filePath)) {
        return JSON.parse(JSON.stringify(require(filePath)));
    }

    throw new Error(`Data \"${file}\" from guild \"${interaction.guildId}\" not found!`);
}

function setData(file, data, interaction) {
    const filePath = `./data/${interaction.guildId}/${file}`;

    console.log(`backing up ${file}...`);
    fs.copyFileSync(filePath, `${filePath}.bak`);
    console.log(`writing new ${file}...`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

module.exports = { setupGuild, getData, setData };
