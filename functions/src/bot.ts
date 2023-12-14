import {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  OAuth2Scopes,
  PermissionFlagsBits,
  APIApplicationCommand,
} from "discord.js";
import { logger } from "firebase-functions/v1";
import { DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID } from "./app";

const commands: Partial<APIApplicationCommand>[] = [
  {
    name: "ping",
    description: "Pong!",
  },
];

let rest = new REST({ version: "10" });

console.log("Started refreshing application (/) commands.");

try {
  DISCORD_BOT_TOKEN.value() && console.log("bot_token EXISTS");
  DISCORD_CLIENT_ID.value() && console.log("client_id EXISTS");

  rest.setToken(DISCORD_BOT_TOKEN.value());
  rest
    .put(Routes.applicationCommands(DISCORD_CLIENT_ID.value()), {
      body: commands,
    })
    .then(() => {
      console.log("Successfully reloaded application (/) commands.");
    })
    .catch(console.log);
} catch (err) {
  //
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", (c) => {
  logger.info("Logged in", { tag: client?.user?.tag });
  const link = client.generateInvite({
    scopes: [OAuth2Scopes.Bot, OAuth2Scopes.Email],
    permissions: [
      PermissionFlagsBits.UseApplicationCommands,
      PermissionFlagsBits.AddReactions,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.ManageThreads,
      PermissionFlagsBits.CreatePrivateThreads,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.AttachFiles,
      PermissionFlagsBits.EmbedLinks,
    ],
  });
  logger.info({ link: link.replace("undefined", "https://discord.com") });
});

client.on("interactionCreate", async (interaction) => {
  console.info(interaction.toJSON());
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "status") {
    logger.info("Operational status");
    try {
      await interaction.deferReply();
      await interaction.editReply("Operational!");
    } catch (err) {
      logger.error(err);
    }
  }
});

try {
  /**
   * Start Bot
   */
  client.login(DISCORD_BOT_TOKEN.value());
} catch (err) {
  //
}

export default client;
