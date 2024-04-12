const mongoose = require("mongoose");
const { mongoURL } = require("../config.js");
const moment = require("moment");
const log = (l) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`);
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {});
    log(`Veritabanı Bağlantısı Başarılı`);
    console.log(`
    ___.               __                          
    \\_ |__  __  _  ___/  |_  __ __  __ __ __  _  __
     | __ \\ \\ \\/ \\/ /\\   __\\|  |  \\|  |  \\\\ \\/ \\/ /
     | \\_\\ \\ \\     /  |  |  |  |  /|  |  / \\     / 
     |___  /  \\\\/\\_/   |__|  |____/ |____/   \\\\/\\_/  
         \\/  
`);

  } catch (error) {
    log(`Veritabanı Bağlantısı Başarısız: ${error}`);
  }
};

module.exports = connectToMongoDB;
