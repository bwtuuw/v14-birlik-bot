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
    .setName("kov")
    .setDescription("Bir kişiyi klandan kovarsınız!")
    .addUserOption((option) =>
      option
        .setName("kişi")
        .setDescription("Klandan kovulacak kişiyi seçin")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (interaction.channel.id !== "1212822142379630684") // Kanal ID
      return interaction.reply({
        content:
          ":information_source: **Bu komutu sadece <#1212822142379630684> kanalında kullanabilirsiniz!**",
        ephemeral: true,
      });
    const member = interaction.options.getMember("kişi");
    if (!interaction.member.roles.cache.has("1128982919009017876")) // Yetkili ID
      return interaction.reply({
        content: ":information_source: Yeterli rütbeniz bulunmamakta.",
        ephemeral: true,
      });
      let roller = ["1128983054543769610", "1128983098449727559","1128983149909643314","1128983195401064458"]; // Tüm Birlik idleri
    member.setNickname('');
    roller.forEach(async (rol) => {
      try {
        if (member.roles.cache.has(rol)) {
          await member.roles.remove(rol);
          interaction.reply({
            content: `**[${now}]** : **(${member})** adlı klan üyesi klandan **kovuldu!**`,
            ephemeral: false,
          });
        }
      } catch (error) {
        console.error(`Rol kaldırma hatası: ${error}`);
        interaction.reply({
          content: `**[${now}]** : **(${member})** adlı klan üyesinin rolünü kaldırırken bir **hata oluştu.**`,
          ephemeral: true,
        });
      }
    });
    
  },
};

