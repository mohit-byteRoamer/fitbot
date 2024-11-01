import TelegramBot from "node-telegram-bot-api";
import schedule from "node-schedule";
import {
  formatWorkoutMessage,
  isValidDay,
  isValidMonth,
} from "./utils/index.js";

const token = "8096663847:AAFIuq5NhO4PR6AK5h0WN6ZLMVZx_L3LxoM";
const bot = new TelegramBot(token, { polling: true });

const botDescription = `
Welcome to the **Telegram Workout Bot**! This bot helps you access personalized workout plans based on the month and day of your choice.

### Getting Started

1. **Start the Bot**:
   - Use the command /start to initiate the bot. This will provide you with a welcome message and instructions on how to use the bot.

2. **Requesting a Workout**:
   - To get your workout plan, use the command /workout <month> <day>.
   - Replace <month> with the month number (e.g., 1 for January) and <day> with the day of the week (e.g., Monday).

   **Example**: 
   \`/workout 1 Monday\`

3. **Daily Reminders** (Optional):
   - You can set a daily reminder for your workout by using the command /setdaily.

### Conclusion

Feel free to interact with the bot and access your workout plans effortlessly. Happy training!
`;

// Command to get bot description
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, botDescription, { parse_mode: "Markdown" });
});

bot.onText(/\/workout (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const [month, day] = match[1].split(" ");

  if (!isValidMonth(month) || !isValidDay(day)) {
    return bot.sendMessage(chatId, "Invalid month or day. Please try again.");
  }

  const workoutMessage = formatWorkoutMessage(month, day);
  bot.sendMessage(chatId, workoutMessage, { parse_mode: "Markdown" });
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! Use /workout <month> <day> to get your workout for that day.\nExample: /workout 1 Monday"
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (!text.startsWith("/")) {
    bot.sendMessage(
      chatId,
      "To get a workout, use the command:\n/workout <month> <day>\nExample:\n/workout 1 Monday"
    );
  }
});

// Daily reminder (optional)
bot.onText(/\/setdaily/, (msg) => {
  const chatId = msg.chat.id;

  // Schedule a daily reminder (for example, at 6:00 AM)
  schedule.scheduleJob("0 6 * * *", () => {
    bot.sendMessage(
      chatId,
      "Good morning! Here’s your workout for today. Use /workout <month> <day> to check it!"
    );
  });
});

// Error handling for polling
bot.on("polling_error", (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Bot is running...");
  console.log(`Server is running on port ${PORT}`);
});
