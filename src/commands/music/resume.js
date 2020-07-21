const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume'],
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Resumes the queue.'
			},
			category: 'music',
			channel: 'guild'
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.send({
				embed: { description: 'You must be connected to a voice channel to use that command!', color: 0x5e17eb }
			});
		}

		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.paused) {
			return message.util.send({
				embed: { description: 'Player isn\'t not Paused!', color: 0x5e17eb }
			});
		}
		await queue.player.pause(false);

		return message.util.send({
			embed: { author: { name: 'Resumed ▶' }, color: 0x5e17eb }
		});
	}
}

module.exports = ResumeCommand;
