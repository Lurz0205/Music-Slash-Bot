const Discord = require("discord.js")

module.exports = {
    name: "previous",
    description: "Phát bản nhạc trước đó!",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu phải tham gia một kênh thoại trước đã!", ephemeral: true })
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
            await client.distube.previous(interaction)
            await interaction.reply("***Muốn phát lại bài trước đó hử.. Được rùi cậu thích thì tớ chiều ^^***")
            const message = await interaction.fetchReply()
            await message.react("⏮")
        } catch {
            interaction.reply({ content: " Cái cậu này! Làm gì có bản nhạc nào trước kia đâu ", ephemeral: true })
        }
    }
}
