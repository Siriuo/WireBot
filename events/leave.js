class LEAVE
{

	constructor()
	{

	}
    leave()
    {
		const config = require('./config/config.json');
		const mysql = require('mysql');
		const mysqldb = mysql.createConnection(config['db']);

        if(mysqldb.state === 'disconnected'){
            mysqldb.connect(function(error){
                if (error) {
                    mysqldb.end();
                    //Log error if db connection fails.
                    return;
                }
            });
        }
        sql = "SELECT * FROM players WHERE discord_uuid = '" + discord_uuid + "'";
        mysqldb.query(sql, function(error, result, fields) {
            if (error){
                mysqldb.end();
                //Log error if DB error
                return;
            }
            if (result.length == 0 || result == undefined){
                sql = "UPDATE players SET `active` = 0 WHERE `discord_uuid` = '" + discord_uuid + "'";
                mysqldb.query(sql, function(error, result, fields){
                    if (error){
                        mysqldb.end();
                        //Log error if DB error
                        return;
                    }
                    return;
                });
            }
        });
    }

}

module.exports = LEAVE;
