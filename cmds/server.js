//ru: пример готовой комманды "serverinfo". En: example of a ready-made command " serverinfo"
const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    let createguildt = new Date(message.guild.createdTimestamp)
  let createguild = createguildt.toLocaleString('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: 'numeric'
  })
  let accjoint = new Date(message.member.joinedAt)
  let accjoin = accjoint.toLocaleString('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: 'numeric'
  })
  let embed = new Discord.MessageEmbed()
    .setTitle(`Информация о сервере`)
    .setColor(`#bb0000`)
    .setAuthor(`Запросил(а): ${message.author.username}`, message.author.displayAvatarURL({dynamic : true, size: 1024}))
    .addField(`\`\`Название сервера\`\``, `${message.guild.name}`, true)
    .addField(`\`\`Участников\`\``,`\`\`💫 ${message.guild.memberCount}\`\``, false)
    .addField(`\`\`Каналов\`\``, `📁${message.guild.channels.cache.size}`, true)
    .addField(`\`\`Ролей\`\``, `👾${message.guild.roles.cache.size}`, true)
    .addField(`\`\`Эмодзи\`\``, `\`\`😉${message.guild.emojis.cache.size}\`\``, true)
    .addField(`\`\`Владелец\`\``, `${message.guild.owner.user}`, false)
    .addField(`\`\`Создан\`\``, `\`\`${createguild}\`\``)
    .addField(`\`\`Вы вступили\`\``, `\`\`${accjoin}\`\``)
    .setThumbnail(message.guild.iconURL({dynamic : true}))
    .setTimestamp();
  message.channel.send(embed);
};

module.exports.help = {
  name: "server"  //<= ru: имя команды по которой она вызывается. en: the name of the command that it is called for.
};
