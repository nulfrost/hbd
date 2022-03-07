const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../db/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription(
      "Remove your birthday from the database of birthday's in your server"
    ),
  async execute(interaction) {
    try {
      let user = await prisma.user.findUnique({
        where: {
          user_id: interaction.user.id,
        },
      });

      if (!user) {
        await interaction.reply({
          content: "You haven't added your birthday to the database yet",
          ephemeral: true,
        });
        return;
      }

      if (user.user_id !== interaction.user.id) {
        await interaction.reply({
          content: "Invalid user ID.",
          ephemeral: true,
        });
        return;
      }

      await prisma.server.update({
        where: {
          server_id: interaction.guildId,
        },
        data: {
          birthdays: {
            delete: {
              user_id: interaction.user.id,
            },
          },
        },
      });

      await interaction.reply({
        content: "Entry successfully removed",
        ephemeral: true,
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
