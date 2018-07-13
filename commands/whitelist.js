const whitelistHandler = require('../whitelistHandler');
const whitelist = new whitelistHandler();

const logHandler = require('../logHandler');
const log = new logHandler();

exports.run = (client, message, args, roles) => {
	
	let discord_uuid = message.author.id;
	let discord_username = message.author.username.toString();
	
	log.info(roles);
	
	log.info(args.length);
	
	
	if(args.length === 0) return;

	
	if (roles.includes('Admin') || roles.includes('Owner/God')){
		if(args[0] == 'update'){
			let old_mc_username = args[1];
			let new_mc_username = args[2];
			whitelist.updateWhitelist(discord_uuid, discord_username, old_mc_username, new_mc_username);
			message.reply('Whitelist Updated! Please allow 5 - 10 minutes for the whitelist to complete.');
			return;
		}
	}
	
	if(roles.includes('Member')){
		log.info("Adding User To Whitelist!");
		whitelist.addWhitelist(discord_uuid, discord_username, args[0]);
		message.reply('Thank you! You have been whitelisted. Please allow 5 - 10 minutes for the whitelist to complete.');
		return;
	}
	
	
	
	
	
}