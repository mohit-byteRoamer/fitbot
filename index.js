import TelegramBot from "node-telegram-bot-api";
import express from "express";
import setupBotRoutes from "./route/bot_route.js";

const app = express();

const token = "8096663847:AAFIuq5NhO4PR6AK5h0WN6ZLMVZx_L3LxoM";
const bot = new TelegramBot(token, { polling: true });


// bot.onText(/\/about/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, botDescription, { parse_mode: "Markdown" });
// });

// bot.onText(/\/workout (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const [month, day] = match[1].split(" ");

//   if (!isValidMonth(month) || !isValidDay(day)) {
//     return bot.sendMessage(chatId, "Invalid month or day. Please try again.");
//   }

//   const workoutMessage = formatWorkoutMessage(month, day);
//   bot.sendMessage(chatId, workoutMessage, { parse_mode: "Markdown" });
// });

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(
//     chatId,
//     "Welcome! Use /workout <month> <day> to get your workout for that day.\nExample: /workout 1 Monday"
//   );
// });

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text.toLowerCase();

//   if (!text.startsWith("/")) {
//     bot.sendMessage(
//       chatId,
//       "To get a workout, use the command:\n/workout <month> <day>\nExample:\n/workout 1 Monday"
//     );
//   }
// });

// bot.onText(/\/setdaily/, (msg) => {
//   const chatId = msg.chat.id;

//   // Schedule a daily reminder (for example, at 6:00 AM)
//   schedule.scheduleJob("0 6 * * *", () => {
//     bot.sendMessage(
//       chatId,
//       "Good morning! Here’s your workout for today. Use /workout <month> <day> to check it!"
//     );
//   });
// });

// bot.on("polling_error", (error) => {
//   console.error(`Polling error: ${error.code} - ${error.message}`);
// });

setupBotRoutes(bot);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Bot is running...");
  console.log(`Server is running on port ${PORT}`);
});
