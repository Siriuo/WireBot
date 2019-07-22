module.exports = (client, member) => {
  const defaultChannel = member.guild.channels.find(channel => "main");
  defaultChannel.send(`Welcome ${member.user} to Wirenut.`).catch(console.error);
}
