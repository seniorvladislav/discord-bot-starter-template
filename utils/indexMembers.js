const Member = require("../models/Member");
const { guildId } = require("../config.json");

const indexMembers = async (client) => {
  // Получаем объект Guild нашего сервера
  const guild = client.guilds.resolve(guildId);

  // GuildMemberManager - для манипуляции с членами сервера
  const { members } = guild;

  // Если количество членов в кэше не равно числу участников сервера - кэш устарел, обновляем его
  if (members.cache.size !== guild.memberCount) {
    await members.fetch({ force: true });
  }

  members.cache.forEach(async (member) => {
    // Ботов в БД не сохраняем
    if (member.user.bot) return;

    // Поля для добавления нового и поиска существующего члена в БД
    const memberObj = {
      guildId: guild.id,
      discordId: member.user.id,
    };

    const newMember = new Member({
      ...memberObj,
      username: member.user.username,
    });

    // Записан ли член в БД?
    const memberExists = !!(await Member.findOne(memberObj));

    // Если не записан - сохраняем
    if (!memberExists) {
      await newMember.save();
    }
  });
};

module.exports = indexMembers;
