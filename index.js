const {
  Client,
  GatewayIntentBits,
  InteractionType
} = require('discord.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

// Log in!
client.login(process.env.DISCORD_BOT_TOKEN)

client.on('interactionCreate', (interaction) => {
  if (interaction.type == InteractionType.MessageComponent) {
    let tmp = interaction.customId.split('_')

    interaction.commandName = tmp.shift();
    interaction.customId = tmp.join('_')
  }

  let path = `./interactions/${interaction.commandName}`

  if (interaction.options?.getSubcommandGroup(false)) {
    path += `/${interaction.options.getSubcommandGroup()}`
  }

  if (interaction.options?.getSubcommand(false)) {
    path += `/${interaction.options.getSubcommand()}`
  }

  require(`${path}.js`)(interaction)
})
