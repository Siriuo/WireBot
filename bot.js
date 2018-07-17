const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');



const token = config['token'];
const staffRoles = JSON.parse(JSON.stringify(config['staff_roles']));



const logHandler = require('./logHandler');
const log = new logHandler();






client.on('ready', () => {
    log.info("I am Listening!");
});

client.on('guildMemberAdd', member => {
    try {
        var welcomeChannel = member.guild.channels.find('id', config['welcome_channel']);
        var welcomeMessage = "Welcome " + member.toString() + ", Please check the " + welcomeChannel.toString() + " channel to get started.";
        member.guild.channels.find('id', config['main_channel']).send(welcomeMessage);
        log.info(member.toString() + " has joined Wirenut!");
    }catch(e){
        log.info(e);
    }

});

client.on('guldMemberRemove', member => {
	try {
		whitelist.removeWhitelist(member.id)
		log.info(member.toString() + " has left Wirenut!");
	}catch(e){
		log.error(e);
	}
});





client.on('message', message => {
	try {
        log.info(message.channel.name);
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
		log.error(e);
	}


});


client.login(token);
