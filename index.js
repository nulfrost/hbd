const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { prisma } = require("./db/prisma");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", async (bot) => {
  try {
    console.log(
      "Successfully connected to the database.",
      `Bot online @ ${bot.user.username}#${bot.user.discriminator}`
    );
  } catch (error) {
    console.error("There was an error connecting to the database!", error);
  }
});

client.on("guildCreate", async (server) => {
  try {
    console.info("Joined new server, registering into database: ", server.name);
    await prisma.server.create({
      data: {
        server_id: server.id,
        server_name: server.name,
      },
    });
  } catch {
    console.error(
      "Likely the server has already been registered, this error is okay to ignore"
    );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
