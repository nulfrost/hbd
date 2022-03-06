const { SlashCommandBuilder } = require("@discordjs/builders");
const User = require("../models/User");
const Server = require("../models/Server");
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

      let user = new User({
        user_id: interaction.user.id,
        user_name: `${interaction.user.username}#${interaction.user.discriminator}`,
        birth_month: month,
        birth_day: day,
      });

      await Server.findOneAndUpdate(
        {
          server_id: interaction.guildId,
        },
        { $addToSet: { birthdays: user._id } }
      );

      await interaction.reply({
        content: "Birthday added to database!",
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content: `There was an error: ${error}`,
        ephemeral: true,
      });
    }
  },
};
