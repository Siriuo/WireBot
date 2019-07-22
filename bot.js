const Config = require('./config.json');

const Discord = require('discord.js');
const Client = new Discord.Client();

const Enmap = require('enmap');
const fs = require('fs');

Client.config = Config;


fs.readdir("./events", (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        Client.on(eventName, event.bind(null, Client));
    });
});

Client.commands = new Enmap();

fs.readdir("./commands", (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let command = file.split(".")[0];
        Client.commands.set(command, props);
    });
});

Client.login(Config.token);
