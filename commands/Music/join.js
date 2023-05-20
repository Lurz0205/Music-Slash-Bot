const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "join",
    description: "Mời tớ tham gia vào kênh thoại!",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu hãy tham gia vào một kênh thoại đã chứ!", ephemeral: true })
        }
        try {
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            await interaction.reply("***Tớ đã thành công tham gia vào kênh thoại rồi nè :3***")
        } catch (error) {
            return interaction.reply({ content: `Tớ không thể vào kênh thoại này, bi lỗi rùi :(( : ${error}`, ephemeral: true })
        }
    }
}
