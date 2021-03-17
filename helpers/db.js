// Если бот запущен локально, и только тогда
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const { MONGODB_CONNECTION_URI } = process.env;

// console.log(MONGODB_CONNECTION_URI);

module.exports = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Успешное подключение к базе данных!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
