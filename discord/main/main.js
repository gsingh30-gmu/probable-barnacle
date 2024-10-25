require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

// Destructure environment variables
const { DISCORD_TOKEN, TRACK_USER_IDS } = process.env;

console.log("DISCORD_TOKEN", DISCORD_TOKEN)
console.log("TRACK_USER_IDS", TRACK_USER_IDS)


// Parse the user IDs into an array and trim any whitespace
const userIdsToTrack = TRACK_USER_IDS.split(',').map(id => id.trim());

if (!DISCORD_TOKEN) {
    console.error('Error: DISCORD_TOKEN is not defined in the .env file.');
    process.exit(1);
}

if (userIdsToTrack.length === 0) {
    console.error('Error: No user IDs found in TRACK_USER_IDS.');
    process.exit(1);
}

// Create a new Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences, // To receive presence updates
        GatewayIntentBits.GuildMembers,   // To access member information
    ],
    partials: [Partials.User, Partials.GuildMember],
});

// When the client is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Tracking statuses for the following users:');
    userIdsToTrack.forEach(id => {
        const member = client.users.cache.get(id);
        if (member) {
            console.log(`- ${member.tag} (ID: ${id})`);
        } else {
            console.log(`- User ID ${id} (Not found)`);
        }
    });
});

// Listen for presence updates
client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.userId) return;

    const userId = newPresence.userId;

    if (!userIdsToTrack.includes(userId) || newPresence.activites[0].name === undefined) return;
    if (newPresence.activities[0].name !== "Custom Status") return;

    let statusMessage = newPresence.activities[0].state;
    console.log("New status message: ", statusMessage)

    const oldStatus = oldPresence ? oldPresence.status : 'offline';
    const newStatus = newPresence.status;

    if (oldStatus !== newStatus) {
        const user = client.users.cache.get(userId);
        const username = user ? user.tag : `User ID ${userId}`;
        console.log(`Status update for ${username}: ${oldStatus} → ${newStatus}`);
    }
});

// Log in to Discord
client.login(DISCORD_TOKEN).catch(error => {
    console.error('Failed to login:', error);
    process.exit(1);
});