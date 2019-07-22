const RulesHandler = require('../modules/rules.js');
module.exports = async (client) => {

    // Handle posting of updated rules on ready
    await client.channels.find(channel => channel.name === "bot-testing").fetchMessages().then(messages => {
        messages.last().delete();
    });
    let rules = await RulesHandler.create();
    client.channels.find(channel => channel.name === "bot-testing").send(rules);


    console.log("Client Ready");
}
