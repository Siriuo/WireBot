const logHandler = require('../logHandler');
const log = new logHandler();

exports.run = (client, message, args, roles) => {

	let discord_uuid = message.author.id;
	let discord_username = message.author.username.toString();


	if(args.length === 0) return;


	if (roles.includes('Moderator') || roles.includes('Admin') || roles.includes('Owner/God')){
		let channel = message.guild.channels.find('name', 'free-games');

		if(!channel) return;

		channel.send(args.join(" "));

		message.delete();
	}

}
