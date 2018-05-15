const discord = require('discord.js')
const bot = new discord.Client()
const pre = process.env.prefix
const prefix = pre.toLowercase()
const {baselogger};

bot.commands = new discord.Collection();

require('fs').readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

bot.on('ready', () => {
  bot.user.setActivity(`for ${prefix}help | ${bot.guilds.size} servers`, {type: "WATCHING"});
  console.log("Pancake READY!");
})

bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (message.channel.topic.toLowercase().includes("no bots")) return;
  let mArray = message.content.toLowercase().split(" ");
  let args = mArray.slice(1);
  let logcmd = mArray.slice(prefix.length)
  let cmd = bot.commands.get(logcmd)
  
  if (cmd) {
      cmd.run(bot, message, args, discord)
      console.log(`${message.author.username} used the ${logcmd} command.`)
      // SOON => baselogger(bot, `${message.author.username} used the ${logcmd} command.`, bot.user.avatarURL)
  }
})

bot.login(process.env.token)
