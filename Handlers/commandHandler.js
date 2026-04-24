async function loadCMDS(client) {
    const { loadFiles } = require("../Functions/fileLoader")
    const ascii = require('ascii-table')
    const table = new ascii().setHeading("Commands", "Working")

    await client.cmds.clear();
    await client.subCommands.clear();

    let cmdsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);

        if(command.subCommand)
        return client.subCommands.set(command.subCommand, command)

        client.cmds.set(command.data.name, command);

        cmdsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "✔")
    })

    client.application.commands.set(cmdsArray);

    return console.log(table.toString(), '\nCommands Loaded')
}

module.exports = { loadCMDS }