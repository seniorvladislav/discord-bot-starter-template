const { Client } = require("discord.js");

const client = new Client();

const { token, prefix } = require("./config.json");

client.on("ready", () => {
  console.log(`Успешное подключение к боту`);
  console.log(`Меня зовут ${client.user.username}\n\n`);
});

client.on("message", (msg) => {
  console.log(msg.content);

  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  const command = msg.content.toLowerCase().slice(prefix.length);
});

client.login(token);
