const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "leave",
    description: "Rời khỏi kênh",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "Tớ đâu có ở kênh thoại nào đâu mà bảo tớ rời :<", ephemeral: true })
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        connection.destroy()
        await interaction.reply("***Vâng! Tớ đã rời khỏi kênh thoại rùi.***")
    }
}
