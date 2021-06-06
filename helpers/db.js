// Если бот запущен локадьно, и только тогда
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Успешное подключение к MongoDB`);

    return mongoose;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { connectDB };
