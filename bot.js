const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');

const token = config['token'];

const LEAVE = require('./events/leave');
const leave = new LEAVE();

const LOG = require('./modules/log');
global.log = new LOG();

client.on('ready', () => {
    global.log.info("I am Listening!");
});

client.on('guildMemberAdd', member => {
    try {
        var welcomeChannel = member.guild.channels.find('name', 'main');
        var welcomeMessage = "Welcome " + member.toString() + ", Please check the " + welcomeChannel.toString() + " channel to get started.";
        welcomeChannel.send(welcomeMessage);
        global.log.info(member.toString() + " has joined Wirenut!");
    }catch(e){
        global.log.info(e);
    }

});

client.on('guldMemberRemove', member => {
	try {
        leave.leave();
		global.log.info(member.toString() + " has left Wirenut!");
	}catch(e){
		global.log.error(e);
	}
});


client.on('message', message => {
	try {
		var userRoles = message.member.roles;
		let roles = [];
		userRoles.forEach(function(role){
			roles.push(role.name);
		});
		if (message.author.bot) return;

		if(!message.content.startsWith("!")) return;

		const args = message.content.split(/ +/g);
		const command = args.shift().toLowerCase().substring(1);

		if(!fs.existsSync('./commands/' + command.toString() + '.js')) return;

		let toRun = require('./commands/' + command.toString() + '.js');
		toRun.run(client, message, args, roles);
	} catch (e) {
		global.log.error(e);
	}

});

client.login(token);
