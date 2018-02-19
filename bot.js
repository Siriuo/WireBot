const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config/config.json');

const Rcon = require('./Rcon');



const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));
const welcomeChannel = config['welcome_channel'];
const mainChannel = config['main_channel'];
const announceChannel = config['announce_channel']
const whitelistChannel = config['whitelist_channel'];

const rconClient = new Rcon();

const wireLog = require('./wireLog');
const log = new wireLog();


function sendCommand($command)
{
    //rconClient.exec($command);
    wireLog("Info", "Command Sent: " + $command);
}


client.on('ready', () => {

    //wireLog("Info", "Whitelist Channel Set: " + whitelistChannel);
    log.info("I am Listening!");


});

client.on('guildMemberAdd', member => {
    try {
        //var welcomeChannel = member.guild.channels.find('id', config['welcome_channel']);
        var welcomeMessage = "Welcome " + member.toString() + ", Please check the " + member.guild.channels.find('id', welcomeChannel) + " channel to get started.";
        member.guild.channels.find('id', mainChannel).send(welcomeMessage);
        log.info(welcomeMessage);
    }
    catch(e){
        wireLog("Error", e);
    }

});

client.on('message', message => {
    var userRole = message.member._roles[0];
    if (message.toString().startsWith("!" + "addcommand"))
    {

        if(userRole.indexOf(staffRoles) > -1)
        {
            wireLog("Info", message.author + "(" + message.author.toString() + ")" + " is not admin/staff");
            message.reply("You are not a staff member!");
        }else{
            wireLog("Info", "Add Command: " + "This feature does not exist yet. Please stand by.");
            message.reply('This feature does not exist yet. Please stand by.');

        }
    }else if (message.toString().startsWith("!" + "announce")){
        if(userRole.indexOf(staffRoles) > -1){
            var $log = message.author + "(" + message.author.toString() + ")" + " is not admin/staff";
            wireLog("Info", $log);
            message.reply("You are not a staff member!");
        }else{
            var announcement = message.content.replace("!announce ", "");

            var $log = "Announcement: " + announcement;
            wireLog("Info", "Announcement: " + announcement);
            message.guild.channels.find('id', announceChannel).send(announcement);

            message.delete(1);
        }

    }

    if(message.channel.id === whitelistChannel)
    {
        wireLog("Info", "WHITELIST DETECTED!");

        if(message.toString().startsWith("!" + "whitelist")) {

        }
    }

});


client.login(token);
