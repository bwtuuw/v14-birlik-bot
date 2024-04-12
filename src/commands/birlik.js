const {
  EmbedBuilder,
  PermissionsBitField,
  Colors,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");
const User = require("../mongodb/Schema.js");
const Klan = require("../mongodb/KlanSchema.js");
const moment = require('moment');
const now = moment().format('YYYY-MM-DD HH:mm:ss');



async function updateNicknameInMongoDB(userID, newNickname) {
  try {
    const user = await User.findOne({ userID: userID });
    if (!user) {
      return console.error(":information_source: Kullanıcı bulunamadı.");
    }

    const originalNickname = user.username;
    if (originalNickname === newNickname) {
      return console.error(":information_source: Kullanıcı adı zaten bu şekilde kayıtlı.");
    }

    await User.updateOne(
      { userID: userID },
      { $set: { username: newNickname } }
    );
  } catch (error) {
    console.error(":information_source: İşlem sırasında bir hata oluştu:", error);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birlik")
    .setDescription("Bir kişiyi birliğe atarsınız!")
    .addUserOption((option) =>
      option
        .setName("kişi")
        .setDescription("Birliğe eklenecek üyeyi seçiniz!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("birlik")
        .setDescription("Birliği seçiniz!")
        .setRequired(true)
        .addChoices(
          { name: "TSK", value: "TSK" },
          { name: "EGM", value: "EGM" },
          { name: "JGK", value: "JGK" },
          { name: "PÖH", value: "PÖH" },
        )
    )
    .addStringOption((option) =>
      option
        .setName("isim")
        .setDescription("Kullanıcı ismini girin")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rütbe")
        .setDescription("Kullanıcı rütbesini girin!")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has("1128982851539456081"))
      return interaction.reply({
        content: ":information_source: Yeterli rütbeniz bulunmamakta.",
        ephemeral: true,
      });

    if (interaction.channel.id !== "1212822142379630684")
      return interaction.reply({
        content:
          ":information_source: Bu komutu sadece <#1212822142379630684> kanalında kullanabilirsiniz!",
        ephemeral: true,
      });
    const user = interaction.options.getMember("kişi");
    const birlik = interaction.options.getString("birlik");
    const isim = interaction.options.getString("isim");
    const yeniRütbe = interaction.options.getString("rütbe");

    let roller = [
      {
        birlik: "TSK",
        id: "1128983054543769610",
      },
      {
        birlik: "EGM",
        id: "1128983195401064458",
      },
      {
        birlik: "JGK",
        id: "1128983098449727559",
      },
      {
        birlik: "PÖH",
        id: "1128983149909643314",
      },
    ];

    let nickname = user.displayName; 
    async function addUserAndUpdateHistory(userID, newUsername, staff) {
      try {
        await User.updateOne(
          { userID: userID },
          {
            $push: {
              usernameHistory: { username: newUsername, staffID: staff },
            },
          },
          { upsert: true }
        );
      } catch (error) {
        console.error(":information_source: İşlem sırasında bir hata oluştu:", error);
      }
    }

    async function incrementHak(KlanUser) {
      try {
        let KlanSorgu = await Klan.findOne({ KlanUser: KlanUser });
        let data = KlanSorgu ? KlanSorgu.hak || 0 : 0;


        await Klan.updateOne(
            { KlanUser: KlanUser },
            { $inc: { hak: 1 } },
            { upsert: true }
        );


        if (data > 3) {
            await interaction.reply({
                content:
                    ":information_source: Kullanıcı klana eklenemez, zaten maksimum klan hakkına ulaşmış.",
                ephemeral: true,
            });
            return;
        }


        const newNickname = `[${birlik}]${isim}[${yeniRütbe}]`;


        await user.setNickname(newNickname);


        await addUserAndUpdateHistory(
            KlanUser,
            newNickname,
            interaction.user.id
        );

        // Yanıt gönder
        await interaction.reply({
          content: `**[${now}]** : **(${user})** Kullanıcısı klan üyesi olarak **alındı.** | **(Klan Hakkı : ${data + 1})**`,
        });

        // Rol ekleme
        const secilenBirlik = roller.find((item) => item.birlik === birlik);
        if (secilenBirlik) {
            await user.roles.add(secilenBirlik.id);
        }

    } catch (error) {
        console.error(":information_source: Hak artırılırken bir hata oluştu:", error);
        await interaction.reply({
            content: ":warning: İşlem sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
            ephemeral: true,
        });
    }
}


    if (nickname.includes(birlik)) {
      interaction.reply({
        content: `[${now}] :information_source: Klan üyesini zaten bu klanda mevcut.`,
        ephemeral: true,
      });
    } else {
      await incrementHak(user.id);
    }
  },
};
