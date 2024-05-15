const {
  REST,
  Routes
} = require('discord.js')

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN)

rest.put(
  Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), {
    body: [{
      "name": "ping",
      "description": "Ping the bot.",
    }]
  }
)
