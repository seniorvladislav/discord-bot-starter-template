const Member = require("../models/Member");
const { guildId } = require("../config.json");

module.exports = async (client) => {
  const guild = client.guilds.resolve(guildId);

  // console.log(guild.name, guild.id);

  // GuildMemberManager
  const { members } = guild;

  // .cache - объект класса Collection/Map ES6/ES201
  // similar to [].length
  // guild - {} класса Guild
  if (members.cache.size !== guild.memberCount) {
    await members.fetch({ force: true });
  }

  members.cache.forEach(async (member) => {
    if (member.user.bot) return;

    const memberData = {
      guildId: guild.id,
      discordId: member.user.id,
      username: member.user.username,
    };

    const { guildId, discordId } = memberData;

    const memberExists = await Member.findOne({
      guildId,
      discordId,
    });

    if (!memberExists) {
      Member.create(memberData);
    }
  });
};
