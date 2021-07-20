const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require("fs");
let config = require("./botconfig.json");
let token = config.token;
let prefix = config.prefix;
fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!"); //Ru: нету команд/вывод в терминал. en: there is no command/output to the terminal.
  console.log(`Загружено ${jsfiles.length} комманд`); //ru: сколько было загруженно команд. 
  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}.${f} Загружен!`); 
    bot.commands.set(props.help.name, props);
  });
});
bot.on('ready', () =>{
  bot.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`)) //Ru: Создаётся ссылка на приглашение бота на ваш сервер. En:A link is created to invite the bot to your server
  bot.user.setPresence({
    status: 'online',
    activity: {
    name: `Working` //Ru: Статус вашего бота. En: The status of your bot.
  }
  })
})

bot.on('message', message =>{ 
    if (message.author.bot) return;
    if (message.channel.type === 'dm') {
return //Ru: Игнорировать сообщения в личку. En: Ignore messages in PM
}
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
   let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd){
      cmd.run(bot, message, args);
    }
  });

bot.login(token)

