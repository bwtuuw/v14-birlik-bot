const {
  EmbedBuilder,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Colors,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../config.js");
module.exports = {
  name: "interactionCreate",
  execute: async (interaction) => {
    let client = interaction.client;// bwtuuw
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;

      readdirSync("./src/commands").forEach((file) => {
        const command = require(`../../src/commands/${file}`);
        if (
          interaction.commandName.toLowerCase() ===
          command.data.name.toLowerCase()
        ) {
          command.run(client, interaction);
        }
      });
    }
    if (interaction.customId === "ilan-ver") {
      const modal = new ModalBuilder()
        .setCustomId("ilan-ver-modal")// bwtuuw
        .setTitle("İlan Bilgileri");

      const input = new TextInputBuilder()// bwtuuw
        .setCustomId("ilan-ver-input")
        .setPlaceholder("BMW M4")
        .setLabel("Araç Modeli")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);// bwtuuw

      const input2 = new TextInputBuilder()// bwtuuw
        .setCustomId("ilan-ver-input2")
        .setPlaceholder("Varex Egsoz + Cam Filmi")
        .setLabel("Araç Özellikleri")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);// bwtuuw

      const input3 = new TextInputBuilder()
        .setCustomId("ilan-ver-input3")// bwtuuw
        .setPlaceholder("+240")
        .setLabel("Araç Max KM/H")// bwtuuw
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const input4 = new TextInputBuilder()// bwtuuw
        .setCustomId("ilan-ver-input4")
        .setPlaceholder("ID 12")
        .setLabel("İletişim")// bwtuuw
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      const input5 = new TextInputBuilder()
        .setCustomId("ilan-ver-input5")// bwtuuw
        .setPlaceholder("URL Zorunlu")
        .setLabel("Araç Görseli")// bwtuuw
        .setRequired(true)
        .setStyle(TextInputStyle.Short); // bwtuuw

      const inputrow = new ActionRowBuilder().addComponents(input);// bwtuuw
      const inputrow2 = new ActionRowBuilder().addComponents(input2);// bwtuuw
      const inputrow3 = new ActionRowBuilder().addComponents(input3);// bwtuuw
      const inputrow4 = new ActionRowBuilder().addComponents(input4);// bwtuuw
      const inputrow5 = new ActionRowBuilder().addComponents(input5);// bwtuuw

      modal.addComponents(inputrow, inputrow2, inputrow3, inputrow4, inputrow5);// bwtuuw
      await interaction.showModal(modal);// bwtuuw
    }
    if (interaction.customId === "ilan-ver-modal") {
      let model = interaction.fields.getTextInputValue("ilan-ver-input");
      let ozellik = interaction.fields.getTextInputValue("ilan-ver-input2");
      let km = interaction.fields.getTextInputValue("ilan-ver-input3");
      let iletisim = interaction.fields.getTextInputValue("ilan-ver-input4");
      let url = interaction.fields.getTextInputValue("ilan-ver-input5");

      let button = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel("Araç İlanı Ver")
        .setCustomId("ilan-ver");

      await interaction.reply({
        content: "> ✅ **Başarılı!** İlanınız verildi.",
        ephemeral: true,
      });


const ownerMention = `<@${interaction.user.id}>`;

interaction.guild.channels.cache.get(config.kanalid).send({
  content: `- Araç Modeli: **${model}**\n- Araç Özellikleri: **${ozellik}**\n- Araç Max KM/H: **${km}**\n- İletişim: **${iletisim}**\n- Araç Görseli: ${url}\n\n ## - İlanın Sahibi: ${ownerMention}`,
  components: [new ActionRowBuilder().addComponents(button)],
}).then(async function (message) {
  // Konu (thread) başlatma
  await message.startThread({
    name: "İlan", // bwtuuw
    autoArchiveDuration: 60, // bwtuuw
    type: ChannelType.PublicThread, // bwtuuw
    reason: "İlan kanalı", // bwtuuw
  });
});

      
      
    }
  },
};
