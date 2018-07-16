const whitelistHandler = require('../whitelistHandler');
const whitelist = new whitelistHandler();

const logHandler = require('../logHandler');
const log = new logHandler();

exports.run = (client, message, args, roles) => {

	let discord_uuid = message.author.id;
	let discord_username = message.author.username.toString();


	if(args.length === 0) return;


	if (roles.includes('Admin') || roles.includes('Owner/God')){
		if(args[0] == 'update'){
			let old_mc_username = args[1];
			let new_mc_username = args[2];
			whitelist.updateWhitelist(message, discord_uuid, discord_username, old_mc_username, new_mc_username);
			return;
		}
	}

	if(roles.includes('Member')){
		log.info("Adding User To Whitelist!");
		whitelist.addWhitelist(message, discord_uuid, discord_username, args[0]);
		return;
	}





}
