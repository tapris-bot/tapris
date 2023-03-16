import { Client, REST, Routes } from "discord.js";
import config from "./Core/env";

const main = async () => {
	const rest = new REST({ version: "10" }).setToken(config.token);
	const client = new Client({
		intents: [],
	});
	await client.login(config.token);

	const commands = await rest.get(Routes.applicationCommands(client.user.id)) as unknown[];

	commands.forEach((command: any) => {
		rest.delete(Routes.applicationCommand(client.user.id, command.id))
			.then(() => console.log(`Successfully deleted application command ${command.name}`))
			.catch(console.error);
	});

	await client.destroy();
};

main();