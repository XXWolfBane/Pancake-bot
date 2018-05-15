module.exports.run = (bot, message, args, discord) => {}
let em = new discord.RichEmbed()
.setTitle("People who helped create Pancake Bot!")
.addField("Owners", "Wolfy!")
.addField("Developers!", "FHG Dev")
.setColor("BLUE")
.setThumbnail(bot.user.avatarURL)
.setFooter(message.author.username)
.setTimestamp()

