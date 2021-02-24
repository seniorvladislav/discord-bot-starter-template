const { guildId, COLORS } = require("../config.json");
const welcomeChannelId = "ID канала #добро-пожаловать на твоём сервере";
const { MessageEmbed } = require("discord.js");

function trackMemberLog(client, member, hasLeft = false) {
  // Получаем ссылку на наш сервер
  const guild = client.guilds.cache.get(guildId);

  // Получаем ссылку на канал #добро-пожаловать
  const welcomeChannel = guild.channels.cache.get(welcomeChannelId);

  // Создаём карточку с оповещением
  const embed = new MessageEmbed()
    .setTitle(`**Подписчик ${hasLeft ? "вышел" : "зашёл"}**`)
    .setDescription(
      `${member} ${hasLeft ? "вышел с" : "зашёл на"} сервер${
        hasLeft ? "а" : ""
      }`
    )
    .setThumbnail(
      member.user.displayAvatarURL({
        size: 1024,
        dynamic: true,
      })
    )
    .setFooter(`Теперь подписчиков на сервере — ${guild.memberCount}`)
    .setTimestamp()
    .setColor(`#${hasLeft ? COLORS.red : COLORS.green}`);

  // Отправляем оповещение на канал #добро-пожаловать
  welcomeChannel.send(embed);
}

// Экспортируем функцию, которая сразу после вызова подпишется на 2 события у твоего бота — добавление и удаление члена сервера
module.exports = function (client) {
  // При вступлении нового участника на сервер
  client.on("guildMemberAdd", (member) => trackMemberLog(client, member));

  // При выходе/исключении участника с сервера
  client.on("guildMemberRemove", (member) =>
    trackMemberLog(client, member, true)
  );
};
