const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');

const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));

client.on('ready', () => {
    console.log('I am listening!');
});

client.on('guildMemberAdd', member => {
    // what should happen if someone joins
});

client.on('message', message => {

    var userRole = message.member._roles[0];
    console.log(userRole);
    console.log(staffRoles);
    if (message.toString().startsWith("!" + "addcommand"))
    {

        if(userRole.indexOf(staffRoles) > -1)
        {
            console.log("User is not admin/staff");
            message.reply("You are not a staff member!");
        }else{
            
        }
    }

});


client.login(token);
