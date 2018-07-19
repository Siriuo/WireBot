const config = require('./config/config.json');

const logHandler = require('./logHandler');
const log = new logHandler();
const mysql = require('mysql');
const db = mysql.createConnection(config['db']);

const request = require('request');

class whitelistHandler
{

		constructor()
		{
		}

		addWhitelist(message, discord_uuid, discord_username, mc_username)
		{
			try {
				let sql = "";

				if(db.state === 'disconnected'){
					db.connect(function(error){
						if (error) {
							log.error(error.stack);
							return;
						}
					});
				}


				sql = "SELECT * FROM users WHERE discord_uuid = '" + discord_uuid + "'";

				db.query(sql, function(error, result, fields) {
						if (error) {
							db.end();
							log.error(error.stack);
							return;
						}

						if(result.length == 0 || result == undefined){

							log.info("User Does Not Exist! Creating User!");

							request('https://api.mojang.com/users/profiles/minecraft/' + mc_username, function(error, response, body) {
								if (error) {
									db.end();
									log.error(error.stack);
									return;
								}

								let mc_api = JSON.parse(body);

								sql = "INSERT INTO users SET mc_username = '" + mc_username + "', mc_uuid = '" + mc_api.id + "', discord_uuid = '" + discord_uuid + "', discord_username = '" + discord_username + "', whitelisted = '1'";

								db.query(sql, function(error, result){
									if (error) {
										db.end();
										log.error(error.stack);
										return;
									}

									log.info("New User Created");
									return;
								});


							});


						}else{
							log.info("User Exists! Checking if whitelisted!");
							sql = "SELECT * FROM users WHERE discord_uuid = '" + discord_uuid + "'";
							db.query(sql, function(error, result) {
								if (error) {
									db.end();
									log.error(error.stack);
									return;
								}
								if(result[0].whitelisted === 1) {
									log.info(discord_username + " is Already Whitelisted");
									message.reply("You are already Whitelisted!");
								}else{
									log.info("Updating Whitelist!");
									sql = "UPDATE users SET whitelisted = '1' WHERE discord_uuid = '" + discord_uuid + "'";
									db.query(sql, function(error, result) {
										if(error) {
											db.end();
											log.error(error.stack);
											return;
										}
										log.info("Whitelist for " + discord_username + " Updated!");
										message.reply("You have been whitelisted! Please allow 5 - 10 minutes for the whitelist to complete.");
									});
								}
							});

						}

						return;
				});

				db.end();
			}catch(e){
				log.error(e);
				db.end();
			}
		}

		updateWhitelist(message, discord_uuid, discord_username, old_mc_username, new_mc_username)
		{
			try {

				db.connect(function(error) {
					if (error) throw error;
					var sql = "SELECT * FROM users WHERE discord_uuid = '" + discord_uuid + "'";
					db.query(sql, function (error, result, fields) {
						if (error) throw error;
						db.end();

						if (result.length == 0){
							log.info("User Does Not Exist!");
						}else{
							log.info("User Exists! Checking if whitelisted!");


							request('https://api.mojang.com/users/profiles/minecraft/' + mc_username, function(error, response, body){
								if (error) throw error;
								var mc_api = JSON.parse(body);
								var sql = "UPDATE users SET mc_username = '" + mc_username + "', mc_uuid = '" + mc_api.id + "' WHERE mc_username = '" + old_mc_username + "'";
								db.query(sql, function(error, result){
									if(error) throw error;
									db.end();
									log.info("New User Created");
								});
							});
						}
					});
				});

				db.end();
			}catch(e){
				log.error(e);
				db.end();
			}
		}

		removeWhitelist(discord_uuid)
		{
			try {

				db.connect(function(error) {
					if (error) throw error;
					var sql = "SELECT * FROM users WHERE discord_uuid = '" + discord_uuid + "'";
					db.query(sql, function (error, result, fields) {
						if (error) throw error;
						if (result.length == 0){
							wireLog("Info", "User Does Not Exist!");
						}else{
							log.info("User Exists! Checking if whitelisted!");
								var sql = "UPDATE users SET whitelisted = '0' WHERE discord_uuid = '" + discord_uuid + "'";
								db.query(sql, function(error, result){
									if(error) throw error;
									log.info("New User Created");
								});
						}
					});
				});

				db.end();
			}catch(e){
				log.error(e);
				db.end();
			}
		}


}

module.exports = whitelistHandler;
