import { Command } from "@typings/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

const commandLocales = {
  en: {
    unknownError: () => "Unknown error happened! :(",
  },
  ru: {
    unknownError: () => "Произошла неизвестная ошибка! :(",
  },
};

const command: Command = {
  name: "profilelink",
  description: "Get link to share user using link",
  options: [
    {
      name: "user",
      description: "User to get link for",
      type: ApplicationCommandOptionType.USER,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    const locales = (await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id,
    )) as typeof commandLocales.en;

    if (!user) {
      return interaction.reply({
        content: locales.unknownError(),
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(`Link to ${user.tag}'s profile`)
      .setDescription(`\`https://discord.com/users/${user.id}\``)
      .setURL(`https://discord.com/users/${user.id}`);

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
