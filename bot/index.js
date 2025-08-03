require('dotenv').config();

const { Telegraf } = require('telegraf');
const axios = require('axios');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = process.env.API_URL;

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  const user = ctx.from;
  try {
    // Отправляем пользователя на API с таймаутом 5 секунд
    const response = await axios.post(
      `${API_URL}/user/add`,
      {
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        language_code: user.language_code,
      }
    )
    console.log(response);
    await ctx.reply(response.data.message);
  } catch (error) {
    // Выводим больше информации для диагностики
    if (error.response) {
      // Сервер ответил с ошибкой
      console.error('API response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Запрос был отправлен, но ответа не было
      console.error('No response received from API:', error.request);
    } else {
      // Ошибка при настройке запроса
      console.error('Error setting up request:', error.message);
    }
    await ctx.reply('Произошла ошибка при регистрации. Попробуйте позже.');
  }
});

bot.launch()
  .then(() => console.log('Бот запущен'))
  .catch((err) => console.error('Ошибка запуска бота:', err));