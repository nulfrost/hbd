const { SlashCommandBuilder } = require("@discordjs/builders");
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
    await interaction.reply({ content: "yert", ephemeral: true });
  },
};
