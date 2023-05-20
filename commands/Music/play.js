module.exports = {
    name: "play",
    description: "Phát nhạc.",
    options: [
        {
            name: "query",
            type: 3,
            description: "Nhập vào bản nhạc cậu muốn phát nào! | Hỗ trợ: youtube, soundcloud, spotify",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
        const query = interaction.options.get("query").value
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu phải tham gia vào một kênh thoại đã!", ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "Cậu đang không ở cùng kênh thoại với tớ mà!", ephemeral: true })
            }
        }
        await interaction.reply("🔍 **Để tớ tìm xem...**")
        await interaction.editReply("A! Tớ đã tìm thấy bài hát cậu yêu cầu rồi! :ok_hand: ")
        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}
