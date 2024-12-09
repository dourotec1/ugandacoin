import axios from 'axios';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1314858716499148841/_cZKBxmTZTU09qwiO2D7ZiLNTgpD93T7cksAi_xia9p00Hew34v-GJqE4OYpXaafLqG1';

interface DiscordMessage {
  content?: string;
  embeds?: {
    title?: string;
    description?: string;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    timestamp?: string;
  }[];
}

export const sendDiscordNotification = async (message: DiscordMessage) => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, message);
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
};

export const notifyNewRegistration = async (username: string) => {
  const message = {
    embeds: [{
      title: '👤 New User Registration',
      description: `A new user has registered on Moneiero`,
      color: 0x5865F2,
      fields: [
        { name: 'Username', value: username, inline: true },
        { name: 'Time', value: new Date().toISOString(), inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  await sendDiscordNotification(message);
};

export const notifyWalletAccess = async (username: string) => {
  const message = {
    embeds: [{
      title: '💰 Wallet Access',
      description: `A user has accessed their wallet`,
      color: 0x57F287,
      fields: [
        { name: 'Username', value: username, inline: true },
        { name: 'Time', value: new Date().toISOString(), inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  await sendDiscordNotification(message);
};