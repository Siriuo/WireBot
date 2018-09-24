exports.run = (client, message, args, roles) => {
    const config = require('../config/config.json');

    const UUID = require('../modules/uuid');
    const uuid = new UUID();

    const mysql = require('mysql');
    const mysqldb = mysql.createConnection(config['db']);

    if(args.length == 0){
        global.log.info("No ARGS");
        return;
    }

    if(message.channel.name != 'whitelist'){
        global.log.info("Invalid Channel");
        return;
    }

    uuid.get(args[0], function(mc_uuid){

        let discord_uuid = message.author.id;
        let discord_username = message.author.username.toString();
        let sql = '';
        let results = null;

        if(mysqldb.state === 'disconnected'){
			mysqldb.connect(function(error){
				if (error) {
                    mysqldb.end();
                    message.reply("There was an error adding you to the whitelist! Please try again. If you continue to get this message please contact a staff member!");
                    message.delete();
					global.log.info("Error in DB Connection!");
					return;
				}
			});
		}
        sql = "SELECT * FROM players WHERE discord_uuid = '" + discord_uuid + "';";
        mysqldb.query(sql, function(error, result, fields) {
			if (error){
				mysqldb.end();
                message.reply("There was an error adding you to the whitelist! Please try again. If you continue to get this message please contact a staff member!");
                message.delete();
				global.log.info("Error in DB Query!");
				return;
			}
			if (result.length == 0 || result == undefined){
                sql = "INSERT INTO players (uuid, username, discord_username, discord_uuid, active) VALUES ('" + mc_uuid + "', '" + args[0] + "', '" + discord_username + "', '" + discord_uuid + "', 1);";
                mysqldb.query(sql, function(error, result, fields){
                    if (error){
        				mysqldb.end();
                        message.reply("There was an error adding you to the whitelist! Please try again. If you continue to get this message please contact a staff member!");
                        message.delete();
        				global.log.info("Error in DB Query!");
        				return;
        			}
                    message.reply("You have been whitelisted!");
                    message.delete();

                });
            }else{
                message.reply("You are already whitelisted!");
                message.delete();
            }
		});
    });
}
