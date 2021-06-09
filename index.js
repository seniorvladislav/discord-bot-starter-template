const { Client } = require("discord.js");
const needle = require("needle");

const { connectDB } = require("./helpers/db");

const trackMemberLog = require("./utils/trackMemberLog");
const indexMembers = require("./utils/indexMembers");

const client = new Client();

const { prefix, locale } = require("./config.json");

// Если бот запущен локадьно, и только тогда
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { TOKEN, THE_CAT_API_KEY } = process.env;

client.on("ready", async () => {
  await connectDB();
  console.log(`Успешное подключение к боту`);
  console.log(`Меня зовут ${client.user.username}\n\n`);
  await indexMembers(client);
  trackMemberLog(client);
});

client.on("message", (message) => {
  console.log("Message content\n" + message.content, "\n");

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const [commandName, ...args] = message.content
    .toLowerCase()
    .slice(prefix.length)
    .split(/ +/);

  const text = args.join(" ");

  if (commandName === "дата") {
    const date = new Date().toLocaleDateString(...locale);
    message.channel.send(`Сейчас на сервере: ${date}`);
  } else if (commandName === "время") {
    const time = new Date().toLocaleTimeString(...locale);
    message.channel.send(`Время на сервере: ${time}`);
  } else if (commandName === "датавремя") {
    const date = new Date().toLocaleString(...locale);
    message.channel.send(date);
  } else if (commandName.match(/ава|avatar/)) {
    const user = message.mentions.users.first() || message.author;

    const avatarURL = user.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png",
    });

    message.channel.send(avatarURL);
  } else if (commandName.match(/коты?|cats?/)) {
    // } else if (commandName.startsWith('кот') || commandName.startsWith('cat')) {
    const endpoint = "https://api.thecatapi.com/v1/images/search";

    needle(
      "get",
      endpoint,
      THE_CAT_API_KEY && {
        headers: {
          "x-api-key": THE_CAT_API_KEY,
        },
      }
    )
      .then((response) => {
        const { body } = response;
        // console.log(body);
        const cat = body[0];

        msg.channel.send(cat.url);
      })
      .catch((err) => console.error(err));
  } else if (commandName.match(/addbal[ance]?/)) {
    require("./commands/add-balance")(message, args, text);
  }
});

client.login(TOKEN);
