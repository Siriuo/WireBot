const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config/config.json');
const mysql = require('mysql');
const request = require('request');

const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));

const db = mysql.createConnection(config['db']);

function wireLog($type, $log)
{
    $type = "[" + $type.toUpperCase() + "]";
    fs.appendFile('logs/wirebot.log', $type + ": " + $log, function(){});
	console.log($log);
}

function addUser(discord_uuid, discord_username, mc_username)
{
	try {
		
		var sql = "SELECT * FROM users WHERE discord_uuid = '" + discord_uuid + "'";
		
		

		db.connect(function(error) {
			if (error) throw error;
			db.query(sql, function (error, result, fields) {
				if (error) throw error;
				if (result.length == 0){
					wireLog("Info", "User Does Not Exist! Creating User!");
					
					request('https://api.mojang.com/users/profiles/minecraft/' + mc_username, function(error, response, body){

						var mc_api = JSON.parse(body);

						var sql = "INSERT INTO users SET mc_username = '" + mc_username + "', mc_uuid = '" + mc_api.id + "', discord_uuid = '" + discord_uuid + "', discord_username = '" + discord_username + "'";
						db.query(sql, function(error, result){
							if(error) throw error;
							wireLog("Info", "New User Created");
						});
					});
	
				}
			});
		});
			
		
	}catch(e){
		wireLog("Error", e);
	}
}


client.on('ready', () => {
    var $log = "I am Listening!";
    wireLog("Info", $log);
});

client.on('guildMemberAdd', member => {
    try {
        var welcomeChannel = member.guild.channels.find('id', config['welcome_channel']);
        var welcomeMessage = "Welcome " + member.toString() + ", Please check the " + welcomeChannel.toString() + " channel to get started.";
        member.guild.channels.find('id', config['main_channel']).send(welcomeMessage);
        var $log = "Welcome: " + welcomeMessage;
        wireLog("Info", $log);
    }catch(e){
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
            wireLog("Info", $log);
            message.reply("You are not a staff member!");
        }else{
            var $log = "Add Command: " + "This feature does not exist yet. Please stand by.";
            wireLog("Info", $log);
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
            wireLog("Info", $log);
            message.guild.channels.find('id', config['announce_channel']).send(announcement);

            message.delete(1);
        }

    }else if (message.toString().startsWith("!" + "whitelist")){
		
		
		
		wireLog("Info", "Test Whitelist");
		var mc_username = message.toString().replace("!whitelist ", "");
        addUser(message.author.id, message.author.username, mc_username);
    }

});


client.login(token);
