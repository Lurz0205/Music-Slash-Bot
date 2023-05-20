const Discord = require("discord.js")

module.exports = {
    name: "resume",
    description: "Tiếp tục phát bản nhạc hiện tại",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Hãy tham gia vào một kênh thoại trước nha!", ephemeral: true })
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
            await client.distube.resume(interaction)
            await interaction.reply("***Resumed the current track***")
            const message = await interaction.fetchReply()
            await message.react("▶")
        } catch {
            interaction.reply({ content: "Bản nhạc hiện tại đang được phát rùi", ephemeral: true })
        }
    }
}
