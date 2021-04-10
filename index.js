const { Client } = require("discord.js");
const needle = require("needle");
const trackMemberLog = require("./utils/trackMemberLog");

const client = new Client();

const { TOKEN, prefix, locale } = require("./config.json");

client.on("ready", async () => {
  console.log(`Успешное подключение к боту`);
  console.log(`Меня зовут ${client.user.username}\n\n`);
  trackMemberLog(client);
});

client.on("message", async (msg) => {
  console.log(msg.content);

  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  const command = msg.content.toLowerCase().slice(prefix.length);

  if (command === "дата") {
    const date = new Date().toLocaleDateString(...locale);
    msg.channel.send(`Сейчас на сервере: ${date}`);
  } else if (command === "время") {
    const time = new Date().toLocaleTimeString(...locale);
    msg.channel.send(`Время на сервере: ${time}`);
  } else if (command === "датавремя") {
    const date = new Date().toLocaleString(...locale);
    msg.channel.send(date);
  } else if (command.match(/ава|avatar/)) {
    const user = msg.mentions.users.first() || msg.author;

    const avatarURL = user.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png",
    });

    msg.channel.send(avatarURL);
  } else if (command.match(/коты?|cats?/)) {
    // } else if (command.startsWith('кот') || command.startsWith('cat')) {
    const endpoint = "https://api.thecatapi.com/v1/images/search";

    needle("get", endpoint)
      .then((response) => {
        const { body } = response;
        // console.log(body);
        const cat = body[0];

        msg.channel.send(cat.url);
      })
      .catch((err) => console.error(err));
  }
});

client.login(TOKEN);
