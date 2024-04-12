const {
  EmbedBuilder,
  PermissionsBitField,
  Colors,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kontrol")
    .setDescription("Kullanıcının isim geçmişini kontrol edersiniz!")
    .addUserOption((option) =>
      option
        .setName("kişi")
        .setDescription("İsim geçmişi kontrol edilecek kişiyi seçin")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has("1128982919009017876"))
      return interaction.reply({
        content: ":information_source: Yeterli rütbeniz bulunmamakta.",
        ephemeral: true,
      });

    if (interaction.channel.id !== "1212823429745475584")
      return interaction.reply({
        content:
          ":information_source: Bu komutu sadece <#1212823429745475584> kanalında kullanabilirsiniz!",
        ephemeral: true,
      });
    const User = require("../mongodb/Schema"); // UserModel dosyasının yolu
    const member = interaction.options.getMember("kişi");
    // Kullanıcı adı geçmişini alacak fonksiyon
    async function getUsernameHistory(userID) {
      try {
        // Kullanıcıyı userID'ye göre bul
        const user = await User.findOne({ userID: userID });

        // Kullanıcı bulunduysa, usernameHistory'yi döndür
        if (user) {
          return user.usernameHistory;
        } else {
          // Kullanıcı bulunamazsa boş bir dizi döndür
          return [];
        }
      } catch (err) {
        console.error(":information_source: Özgeçmiş'i alınırken bir hata oluştu:", err);
        return [];
      }
    }

    // 
    getUsernameHistory(member.id)
      .then((history) => {
        interaction.reply({
          content:
          `## Kullanıcının Özgeçmiş'i: (${member})\n\n \n\n${history
            .map((x) => `- İsim: **${x.username}**\n - Alan Rütbeli: **<@${x.staffID}> **`)
            .join("\n\n")}`,
      });
      })
      .catch((err) =>
        interaction.reply(
          ":information_source: Özgeçmiş'i alınırken bir hata oluştu:",
          err
        )
      );
  },
};
