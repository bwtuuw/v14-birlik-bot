const {
  EmbedBuilder,
  PermissionsBitField,
  Colors,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Klan = require("../mongodb/KlanSchema.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("klan-hak-sıfırla")
    .setDescription("Bir kullanıcıyı klandan çıkartırsınız!")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Bir kullanıcı seçin")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const user = interaction.options.getMember("kullanıcı");

    if (!interaction.member.roles.cache.has("1128982919009017876"))
      return interaction.reply({
        content: ":information_source: Bu komutu kullanamazsın tekrar deneme.",
        ephemeral: true,
      });
    async function resetHak(KlanUser) {
      try {
        const klan = await Klan.findOneAndUpdate(
          { KlanUser },
          { hak: 0 }, // Hak değerini 0 olarak ayarlar
          { upsert: true }
        );

        interaction.reply({
          content: "- Klan üyesinin klan hakkı **sıfırlandı.**",
        });
      } catch (error) {
        interaction.reply({
          content: ":information_source: Hak sıfırlanırken bir **hata oluştu**",
          ephemeral: true,
        });
      }
    }

    resetHak(user.id);
  },
};
