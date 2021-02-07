const { Client } = require("discord.js");

const client = new Client();

const token = "Здесь должен быть токен из портала разработчика Discord";

const PREFIX = "!";

client.on("ready", () => {
  console.log(`Успешное подключение к боту`);
  console.log(`Меня зовут ${client.user.username}\n\n`);
});

client.on("message", (msg) => {
  console.log(msg.content);

  if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

  const command = msg.content.toLowerCase().slice(PREFIX.length);
});

client.login(token);
