const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../json/warnings.json').warns

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.find('name', args[0])
  if(!wUser) return message.channel.send("Couldn't find them...");
  if(wUser.hasPermission("MANAGE_SERVER") || wUser.hasPermission("ADMINISTRATOR")) return message.channel.send("They aren't warnable.");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("../json/warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel.name)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);
  
var warnchannel;
  message.guild.channels.forEach(channel => {
    if (channel.topic.toLowerCase().includes("bot log")) {
          warnchannel = channel;
        }
  })
  if (!warnchannel) return message.channel.send("Couldn't find channel");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.channel.send(`You need to create a mute role dude.`);
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(() => {
      wUser.removeRole(muterole.id)
      message.channel.send(`<@${wUser.id}> has been unmuted.`)
    }, ms("30s"))
  }
  if (warns[wUser.id].warns == 3) {
    wUser.kick(reason)
    message.channel.send(`<${wUser.id}> has been kicked.`)
  }
  
  if(warns[wUser.id].warns == 6){
    wUser.ban(reason);
    message.channel.send(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}
