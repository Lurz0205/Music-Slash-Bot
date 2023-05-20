const Discord = require("discord.js")

module.exports = {
    name: "skip",
    description: "Bỏ qua bản nhạc hiện tại",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu phải tham gia vào một kênh thoại trước đã!", ephemeral: true })
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
        try {
            await client.distube.skip(interaction)
            await interaction.reply("***Đã bỏ qua***")
            const message = await interaction.fetchReply()
            await message.react("⏭")
        } catch {
            interaction.reply({ content: "Không còn bài gì ở sau nữa đâu nha", ephemeral: true })
        }
    }
}
