class UUID {
    constructor(){

    }
    get(username, callback){

        const https = require('https');
        global.uuid;
        var request = require('request');
        request('https://api.mojang.com/users/profiles/minecraft/' + username, function (error, response, body) {

            var mc_uuid = JSON.parse(body).id;
            mc_uuid = mc_uuid.substring( 0, 8 ) + "-" + mc_uuid.substring( 8, 12 ) + "-" + mc_uuid.substring( 12, 16 ) + "-" + mc_uuid.substring( 16, 20 ) + "-" + mc_uuid.substring( 20, 32 );
            return callback(mc_uuid);
        });
    }
}


module.exports = UUID;
