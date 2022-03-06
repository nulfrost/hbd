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
        .setName("add")
        .setDescription(
          "Add the month you were born in, usage: /birthday add: MONTH"
        )
        .setChoices([["January", "january"]])
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({ content: "yert", ephemeral: true });
  },
};
