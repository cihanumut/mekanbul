require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
    console.error("MONGODB_URI bulunamadı! .env dosyasını kontrol et.");
    process.exit(1);
}

mongoose.connect(dbURI, {
});

mongoose.connection.on("connected", function(){
    console.log("Mongoose veritabanına bağlandı:", dbURI);
});

mongoose.connection.on("error", function(err){
    console.error("Mongoose bağlantı hatası:", err);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose bağlantısı kesildi.");
});

process.on("SIGINT", function(){
    mongoose.connection.close();
    console.log("Mongoose bağlantı kapatıldı (uygulama sonlandırıldı).");
    process.exit(0);
});

require("./venue");
