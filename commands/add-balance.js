const Member = require("../models/Member");

module.exports = async (message, args, text) => {
  // Если у автора сообщения нет привилегии Администратор
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return;
  }

  // message.mentions - MessageMentions
  // Получаем члена сервера из упоминания
  // но если никто не был упомянут
  // записываем в переменную автора сообщения
  // то есть баланс будет пополнен у него самого
  const user = message.mentions.users.first() || message.author;

  // console.log("User ID:", userId);

  // console.log(args);

  // Если ни один из аргументов команды нельзя привести к числу
  if (!args.some((arg) => parseInt(arg))) {
    return message.reply(`ты указал неверную сумму перевода`);
  }

  // Получаем сумму пополнения как строку
  let amount = args.find((arg) => arg.match(/^\d+$/));
  // Приводим к целому числу Number
  // Как вариант, можно привести к десятичной дроби
  // с помощью метода parseFloat(str)
  amount = parseInt(amount);

  // console.log(amount);

  // Получаем члена сервера из БД
  const dbMember = await Member.findOne({
    discordId: user.id,
  });

  // Если такого члена в БД не существует
  if (!dbMember) {
    return message.reply(`такого пользователя не существует`);
  }

  // Пополняем баланс на указанную сумму
  dbMember.balance += amount;

  // Сохраняем в БД
  dbMember.save();

  // Сообщаем об успешности операции
  message.channel.send(
    `Баланс ${member} пополнен на ${amount.toLocaleString("ru")}`
  );
};
