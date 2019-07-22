const Discord = require('discord.js');
const rules = require("../rules.json");
exports.create = (client) => {
    const embed = new Discord.RichEmbed();
    embed.setTitle("Wirenut Rules")
        .setColor('#008aff')
        .setDescription("All rules must be followed at all times. Breaking any of the rules may result in being banned.");
    for(var rule in rules){
        embed.addField(rules[rule].name, rules[rule].value, false);
    }

    return embed;
}
