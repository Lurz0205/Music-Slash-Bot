const Discord = require("discord.js")
const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"}\``
module.exports = {
    name: "nowplay",
    description: "Bài hát đang phát hiện tại",
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu phải tham gia vào một kênh thoại đã chứ!", ephemeral: true })
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
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: "Now Playing", iconURL: "https://raw.githubusercontent.com/HELLSNAKES/Music-Slash-Bot/main/assets/music.gif" })
            .setDescription(`[${song.name}](${song.url})`)
            .addField("**Lượt xem:**", song.views.toString(), true)
            .addField("**Lượt thích:**", song.likes.toString(), true)
            .addField("**Thời lượng:**", `${queue.formattedCurrentTime} / ${song.formattedDuration}`)
            .addField("**Link**", `[Tải bài hát này về](${song.streamURL})`)
            .addField("**Status**", status(queue).toString())
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
            .setFooter({ text: `Requested by ${song.user.username}`, iconURL: song.user.avatarURL() })
            .setTimestamp()
        return interaction.reply({ embeds: [embed] })
    }
}
