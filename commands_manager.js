const fs = require("node:fs");
const path = require("node:path");

const commands = [];

function addCommandsDir(dir) {
    const dirContents = fs.readdirSync(dir);

    for (const item of dirContents) {
        const itemPath = path.join(dir, item);
        const stats = fs.lstatSync(itemPath);

        // add all js command modules that fit the criteria
        if (stats.isFile() && item.endsWith(".js")) {
            const command = require("./" + itemPath);

            if ("data" in command && "execute" in command) {
                commands.push(command);
                console.log(`loaded command "${command.data.name}" !!`);
            } else {
                console.warn(`Command "${itemPath}" is missing data or command attributes! Cannot add to command list!`);
            }
        }

        // continue recursion to catch all commands ever <3
        if (stats.isDirectory()) {
            addCommandsDir(itemPath);
        }
    }
}

// load all commands first in module
addCommandsDir("./commands");

function forEachCommand(callback) {
    commands.forEach(callback);
}

module.exports = {
    forEachCommand
};
