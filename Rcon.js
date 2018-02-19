const simpleRcon = require('simple-rcon');

const config = require('./config/config.json');

const rconServer = config['rcon_server'];
const rconPort = config['rcon_port'];
const rconPassword = config['rcon_password'];

const wireLog = require('./wireLog');
const log = new wireLog();


class Rcon {

    constructor() {
        this.state = "disconnected";
        this.rconClient = new simpleRcon({
              host: rconServer,
              port: rconPort,
              password: rconPassword,
              timeout: 0
        });

        this.rconClient.on('authenticated', function() {
            this.state = "connected";
            log.info('Minecraft Connected');
        }).on('disconnected', function() {
            this.state = "disconnected";
            log.error('Minecraft Disconnected');
        }).on('error', function(e){
            this.state = "disconnected";
            log.error(e);
        });

        this.tick();

    }


    connect()
    {
        
        this.rconClient.connect();
    }

    tick(self = this)
    {
        log.info("SELF " + self);

        var self = this;
        if(this.state == "disconnected"){
            log.info("Reconnecting to the Minecraft Server");
            self.connect();
            log.info("UMM?");
            setTimeout(function(){
                self.tick();
            }, 10000, self);
        }else{
            setTimeout(function(){
                self.tick(self);
            }, 60000, self);
        }
    }

}

module.exports = Rcon;
