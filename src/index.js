const path = require('path');
const fs = require('fs');
const envPath = path.join(__dirname, '../', '.env');
const env = JSON.parse(fs.readFileSync(envPath).toString());

const tmi = require('tmi.js');

const wait = require('./wait');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true
    },
    identity: env,
    channels: ['#theprimeagen']
};

const client = new tmi.client(options);
client.connect();

// main point of contact
client.on('chat', async function(channel, user, line, self) {
    if (self) {
        return;
    }

    if (user.username === 'theprimeagen' && ~line.indexOf('!qvip')) {

        try {
            await client.vip(channel, line.split(' ')[1].substring(1));
            await wait(30000);
            await client.unvip(channel, line.split(' ')[1].substring(1));
        } catch (e) {
            console.log(e);
        }
    }
});

