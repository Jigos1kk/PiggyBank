require('dotenv').config();

const { Telegraf, session } = require('telegraf');
const BotController = require('./controllers/BotController');
const ScoketController = require('./controllers/SocketController');

const SessionMiddleware = require('./middleware/SessionMiddleware');
const ClientMiddleware = require('./middleware/ClientMiddleware');


const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN не найден в переменных окружения');
  process.exit(1);
}

ScoketController.connect();
ScoketController.joinRoom('my-room');

const bot = new Telegraf(BOT_TOKEN);

bot.use(session(SessionMiddleware.sessionConfig));

bot.start(BotController.handleStart);
bot.help(BotController.handleHelp);

bot.on('text', BotController.handleText);

bot.catch((err, ctx) => {
  console.error('Ошибка в боте:', err);
  ctx.reply('Произошла внутренняя ошибка. Попробуйте позже.');
});

bot.launch()
  .then(() => {
    console.log('🚀 Бот успешно запущен');
    console.log(`📱 Bot username: @${bot.botInfo.username}`);
  })
  .catch((err) => {
    console.error('❌ Ошибка запуска бота:', err);
    process.exit(1);
  });

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));