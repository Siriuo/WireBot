const fs = require('fs');
class logHandler
{
	
	constructor()
	{
		
	}
	log($type, $log)
	{
		$type = "[" + $type.toUpperCase() + "]";
		fs.appendFile('logs/wirebot.log', $type + ": " + $log, function(){});
		console.log($log);
	}
	
	info($log)
	{
		this.log("Info", $log);
	}
	
	error($log)
	{
		this.log("Error", $log);
	}
}




module.exports = logHandler;