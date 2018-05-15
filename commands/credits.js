module.exports.run = (bot, message, args, discord) => {
let em = new discord.RichEmbed()
  .setTitle("People who helped create Pancake.")
  .addField("Owners", "Wolfy")
  .addField("Developers", "FHGDev")
  .setColor("BLUE")
  .setThumbnail(bot.user.avatarURL)
  .setFooter(`Requested by ${message.author.username}`)
  .setTimestamp()
  message.channel.send({embed: em})
}

module.exports.help = {
  name: "credits"
}
