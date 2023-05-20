const Discord = require("discord.js")

module.exports = {
    name: "loop",
    description: "Bật chế độ lặp cho bản nhạc hiện tại",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu hãy tham gia vào một kênh thoại đã chứ!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Cậu đang không ở cùng kênh thoại với tớ mà!", ephemeral: true })
        }
        let mode = client.distube.setRepeatMode(interaction)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        return interaction.reply("Set repeat mode to `" + mode + "`")
    }
}
