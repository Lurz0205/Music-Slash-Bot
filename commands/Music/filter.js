const Discord = require("discord.js")

module.exports = {
    name: "filter",
    description: "Thêm Filter cho âm thanh",
    options: [
        {
            name: "filter-name",
            type: 3,
            description: "Tên filter | Chọn filter một lần nữa để tắt nó nhé!",
            required: true,
            choices: [
                {
                    name: "8d",
                    value: "3d"
                },
                {
                    name: "Bassboost",
                    value: "bassboost"
                },
                {
                    name: "Echo",
                    value: "echo"
                },
                {
                    name: "Karaoke",
                    value: "karaoke"
                },
                {
                    name: "Nightcore",
                    value: "nightcore"
                },
                {
                    name: "Vaporwave",
                    value: "vaporwave"
                },
                {
                    name: "Flanger",
                    value: "flanger"
                },
                {
                    name: "Gate",
                    value: "gate"
                },
                {
                    name: "Haas",
                    value: "haas"
                },
                {
                    name: "Reverse",
                    value: "reverse"
                },
                {
                    name: "Surround",
                    value: "surround"
                },
                {
                    name: "Mcompand",
                    value: "mcompand"
                },
                {
                    name: "Phaser",
                    value: "phaser"
                },
                {
                    name: "Tremolo",
                    value: "tremolo"
                },
                {
                    name: "Earwax",
                    value: "earwax"
                }
            ]
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const choose = interaction.options.getString("filter-name")
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Cậu hãy tham gia vào một kênh thoại trước đã!", ephemeral: true })
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
        await client.distube.setFilter(interaction, choose)
        const filterembed = new Discord.MessageEmbed()
            .setDescription(`Current queue filter: ${queue.filters.join(", ") || "Off"}`)
            .setColor("RANDOM")
        return interaction.reply({ embeds: [filterembed] })
    }
}
