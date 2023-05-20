const Discord = require("discord.js")
const progressbar = require("string-progressbar")

module.exports = {
    name: "volume",
    description: "Thay đổi âm lượng phát nhạc.",
    options: [
        {
            name: "amount",
            type: 10,
            description: "Phần trăm âm lượng",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const args = interaction.options.getNumber("amount")
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
        const volume = parseInt(args)
        if (volume < 1 || volume > 200) {
            return interaction.reply({ content: "Hãy nhập một số giữa 1 và 200 nhé", ephemeral: true })
        }
        await client.distube.setVolume(interaction, volume)
        const total = 200
        const current = volume
        const bar = progressbar.splitBar(total, current, 27, "▬", "🔘")[0]
        await interaction.reply(`Đã chỉnh âm lượng thành ${volume}%.`)
        await interaction.channel.send(bar)
    }
}
