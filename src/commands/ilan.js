const { // bwtuuw
  EmbedBuilder,
  PermissionsBitField,
  Colors,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ilan")
    .setDescription("Araç ilanı vermenizi sağlar!"),
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has("1128982919009017876"))
      return interaction.reply({
        content: "Yetkin yok!",
        ephemeral: true,
      });

    if (interaction.channel.id !== "1212822166492418118")
      return interaction.reply({
        content:
          ":information_source: Bu komutu sadece <#1212822166492418118> kanalında kullanabilirsiniz!",
        ephemeral: true,
      });
    let embed = new EmbedBuilder()
      .setTitle("Araç İlanı") // bwtuuw
      .setDescription("Araç ilanı vermek için aşağıdaki butona tıklayın!") // bwtuuw
      .setColor(Colors.Blurple);  // bwtuuw
    let button = new ButtonBuilder() // bwtuuw
      .setStyle(ButtonStyle.Primary) // bwtuuw
      .setLabel("Araç İlanı Ver")
      .setCustomId("ilan-ver"); // bwtuuw

    await interaction.reply({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
