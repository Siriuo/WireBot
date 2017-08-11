const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');

const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));

//channels


client.on('ready', () => {
    console.log('I am listening!');
});

client.on('guildMemberAdd', member => {
    try {
            var welcomeChannel = member.guild.channels.find('id', config['welcome_channel']);
            member.guild.channels.find('id', config['main_channel']).send("Welcome ${member}, Please check the " + welcomeChannel.mention() + " channel for ");
    }
    catch(e){
        console.log(e);
    }

});

client.on('message', message => {

    var userRole = message.member._roles[0];
    if (message.toString().startsWith("!" + "addcommand"))
    {

        if(userRole.indexOf(staffRoles) > -1)
        {
            console.log("User is not admin/staff");
            message.reply("You are not a staff member!");
        }else{

                message.reply('This feature does not exist yet. Please stand by.');
                console.log("Add Command: " + "This feature does not exist yet. Please stand by.");
        }
    }else if (message.toString().startsWith("!" + "announce")){
        if(userRole.indexOf(staffRoles) > -1){
            console.log("User is not admin/staff");
            message.reply("You are not a staff member!");
        }else{
            var announcement = message.content.replace("!announce ", "");

            message.guild.channels.find('id', config['announce_channel']).send(announcement);
            console.log("Announcement: " + announcement);

            message.delete(1);
        }

    }

});


client.login(token);
