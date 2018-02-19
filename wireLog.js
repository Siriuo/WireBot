const fs = require('fs');
class wireLog
{
    constructor() {

    }

    log($type, $log) {

        $type = "[" + $type.toUpperCase() + "]";
        fs.appendFile('logs/wirebot.log', "[" + Date() + "]" +  $type + ": " + $log + "\r\n", function(){});
        console.log($type + ": " + $log);
    }

    error($log) {
        this.log("Error", $log);
    }

    info($log) {
        this.log("Info", $log);
    }
}

module.exports = wireLog;
