const {
  EmbedBuilder,
  PermissionsBitField,
  Colors,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require('moment');
const now = moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayrıl")
    .setDescription("Klandan ayrılırsınız!"),
  run: async (client, interaction) => {
    const member = interaction.member;
    if (interaction.channel.id !== "1212823429745475584")
      return interaction.reply({
        content:
          ":information_source: Bu komutu sadece <#1212823429745475584> kanalında kullanabilirsiniz!",
        ephemeral: true,
      });
    let roller = ["1128983054543769610", "1128983098449727559","1128983149909643314","1128983195401064458"]; // Tüm birllik idleri
    member.setNickname(" ");
    roller.forEach((rol) => {
      if (member.roles.cache.has(rol)) {
        member.roles.remove(rol);
      }
    });
    await interaction.reply({
      content: `**[${now}]** : **(${member})** Başarıyla klan **ayrıldınız.**`,
      ephemeral: false,
    }).catch(console.error);
  },
};