module.exports = {
    name: "play",
    description: "Playing music",
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
            return interaction.reply({ content: "Hãy tham gia vào một kênh thoại nha!", ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "Cậu đang không ở cùng một kênh thoại với tớ!", ephemeral: true })
            }
        }
        await interaction.reply("🔍 **Đang tìm kiếm...**")
        await interaction.editReply("Tìm kiếm thành công! :ok_hand: ")
        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}
