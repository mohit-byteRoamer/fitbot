import { aboutHandler, messageHandler, setDailyHandler, startHandler, workoutHandler } from "../controller/bot_controller.js";

export default function setupBotRoutes(bot) {
  bot.onText(/\/about/, (msg) => aboutHandler(bot, msg));
  bot.onText(/\/workout (.+)/, (msg, match) =>
    workoutHandler(bot, msg, match)
  );
  bot.onText(/\/start/, (msg) => startHandler(bot, msg));
  bot.onText(/\/setdaily/, (msg) => setDailyHandler(bot, msg));
  bot.on("message", (msg) => messageHandler(bot, msg));

  bot.on("polling_error", (error) =>
    console.error(`Polling error: ${error.code} - ${error.message}`)
  );
}
