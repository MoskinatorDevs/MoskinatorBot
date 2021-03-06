const { Client, Collection, Intents } = require('discord.js');
const { fstat } = require('fs');
const { readdirSync } = require('fs');
const { normalize, join } = require('path');
const moski = new Client({
    disableEveryone: true,
})
class Moskinator extends Client {
    constructor() {
        super({ messageSweepInterval: 180, messageCacheLifetime: 180, messageCacheMaxSize: 200, ws: { intents: Intents.ALL } });
        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();
        this.prefix = '/';
    };
    getCommand(cmd) {
        return this.commands.get(cmd) || this.commands.get(this.aliases.get(cmd));
    }
    start(token, cmdPath, eventPath) {
        this.login(token);  
        readdirSync(join(process.cwd(), 'src', cmdPath)).map((data) => {   
            const file = require(join(process.cwd(), 'src', cmdPath, data));
            this.commands.set(file.name, file);  
            if(file.aliases) file.aliases.map((alias) => this.aliases.set(alias, file.name))
        });
        readdirSync(join(process.cwd(), 'src', eventPath)).map((data) => {   
            const file = require(join(process.cwd(), 'src', eventPath, data));
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
        });
    }
}; 
module.exports = Moskinator;