// botController.js
import schedule from "node-schedule";
import {
  formatWorkoutMessage,
  isValidDay,
  isValidMonth,
} from "../utils/index.js";
import { botDescription } from "../assets/index.js";

// Controller functions
export const aboutHandler = (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, botDescription, { parse_mode: "Markdown" });
};

export const workoutHandler = (bot, msg, match) => {
  const chatId = msg.chat.id;
  const [month, day] = match[1].split(" ");

  if (!isValidMonth(month) || !isValidDay(day)) {
    return bot.sendMessage(chatId, "Invalid month or day. Please try again.");
  }

  const workoutMessage = formatWorkoutMessage(month, day);
  bot.sendMessage(chatId, workoutMessage, { parse_mode: "Markdown" });
};

export const startHandler = (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! Use /workout <month> <day> to get your workout for that day.\nExample: /workout 1 Monday"
  );
};

export const setDailyHandler = (bot, msg) => {
  const chatId = msg.chat.id;
  schedule.scheduleJob("0 6 * * *", () => {
    bot.sendMessage(
      chatId,
      "Good morning! Here’s your workout for today. Use /workout <month> <day> to check it!"
    );
  });
  bot.sendMessage(chatId, "Daily workout reminder set for 6:00 AM.");
};

export const messageHandler = (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (!text.startsWith("/")) {
    bot.sendMessage(
      chatId,
      "To get a workout, use the command:\n/workout <month> <day>\nExample:\n/workout 1 Monday"
    );
  }
};
