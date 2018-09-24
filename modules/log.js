const fs = require('fs');
class LOG
{

	constructor()
	{

	}
	log($type, $log)
	{
		$type = "[" + $type.toUpperCase() + "]";
		$log = $type + ": " + $log;
		fs.appendFile('logs/wirebot.log', $log, function(){});
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

module.exports = LOG;
