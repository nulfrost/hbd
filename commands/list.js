const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { prisma } = require("../db/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Show a list of birthdays saved in the database"),
  async execute(interaction) {
    try {
      let server = await prisma.server.findUnique({
        where: {
          server_id: interaction.guildId,
        },
        select: {
          birthdays: true,
          server_name: true,
          server_id: true,
        },
      });

      let embed = new MessageEmbed()
        .setTitle(`List of birthdays for ${server.server_name}`)
        .setThumbnail(
          "https://www.pinclipart.com/picdir/middle/525-5251385_party-hat-birthday-clip-art-transparent-background-birthday.png"
        )
        .setFooter({ text: server.server_id });

      server.birthdays.forEach(({ user_name, birth_month, birth_day }) =>
        embed.addField(`${birth_month} ${birth_day}`, user_name)
      );

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was some sort or error here lol",
        ephemeral: true,
      });
    }
  },
};
