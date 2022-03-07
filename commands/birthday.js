const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../db/prisma");
const months = require("../months.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription(
      "Adds your birthday to the database of birthday's in your server"
    )
    .addStringOption((option) =>
      option
        .setName("month")
        .setDescription("Pick your birthday month")
        .setChoices(months)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("day")
        .setDescription("Pick the day you were born on")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(31)
    ),
  async execute(interaction) {
    try {
      let month = interaction.options.getString("month");
      let day = interaction.options.getNumber("day");

      await prisma.server.update({
        where: {
          server_id: interaction.guildId,
        },
        data: {
          birthdays: {
            create: {
              user_id: interaction.user.id,
              birth_day: day,
              birth_month: month,
              user_name: `${interaction.user.username}#${interaction.user.discriminator}`,
            },
          },
        },
      });

      await interaction.reply({
        content: "Birthday added to database!",
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content:
          "You've already added your birthday to the database, please remove or edit your entry",
        ephemeral: true,
      });
    }
  },
};
