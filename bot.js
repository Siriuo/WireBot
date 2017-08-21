const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config/config.json');

const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));

function wireLog($type, $log)
{
    $type = "[" + $type.toUpperCase() + "]";
    fs.appendFile('logs/wirebot.log', $type + ": " + $log, function(){});
}


client.on('ready', () => {
    var $log = "I am Listening!";
    console.log($log);
    wireLog("Info", $log)
});

client.on('guildMemberAdd', member => {
    try {
        var welcomeChannel = member.guild.channels.find('id', config['welcome_channel']);
        var welcomeMessage = "Welcome " + message.author.toString() + ", Please check the " + welcomeChannel.toString() + " channel to get started.";
        member.guild.channels.find('id', config['main_channel']).send(welcomeMessage);
        var $log = "Welcome: " + welcomeMessage;
        console.log($log);
        wireLog("Info", $log);
    }
    catch(e){
        console.log(e);
        wireLog("Error", e);
    }

});

client.on('message', message => {

    var userRole = message.member._roles[0];
    if (message.toString().startsWith("!" + "addcommand"))
    {

        if(userRole.indexOf(staffRoles) > -1)
        {
            var $log = message.author + "(" + message.author.toString() + ")" + " is not admin/staff";
            console.log($log);
            wireLog("Info", $log);
            message.reply("You are not a staff member!");
        }else{
            var $log = "Add Command: " + "This feature does not exist yet. Please stand by.";
            console.log($log);
            wireLog("Info", $log);
            message.reply('This feature does not exist yet. Please stand by.');

        }
    }else if (message.toString().startsWith("!" + "announce")){
        if(userRole.indexOf(staffRoles) > -1){
            var $log = message.author + "(" + message.author.toString() + ")" + " is not admin/staff";
            console.log($log);
            wireLog("Info", $log);
            message.reply("You are not a staff member!");
        }else{
            var announcement = message.content.replace("!announce ", "");

            var $log = "Announcement: " + announcement;
            console.log($log);
            wireLog("Info", $log);
            message.guild.channels.find('id', config['announce_channel']).send(announcement);

            message.delete(1);
        }

    }

    if(message.content.toString().startsWith("!" + "testing"))
    {

    }

});


client.login(token);
