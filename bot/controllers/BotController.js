const ApiService = require('../service/ApiService');
const SessionMiddleware = require('../middleware/SessionMiddleware');
const ClientMiddleware = require('../middleware/ClientMiddleware');

class BotController {
  /**
   * Обработчик команды /start
   */
  static async handleStart(ctx, next) {
    const user = ctx.from;
    
    try {
      const userData = {
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        language_code: user.language_code,
      };

      const result = await ApiService.registerUser(userData);

      
      if (result.success) {
        console.log('User registered successfully:', result.data);
        await ctx.reply(result.data.message || 'Добро пожаловать!');
        SessionMiddleware.saveTokenToSession(ctx, result.data.token);
        await ClientMiddleware.showClientOnToken(ctx);
      } else {
        console.error('Registration failed:', result.error);
        
        // Более детальная обработка ошибок
        if (result.error.status === 409) {
          await ctx.reply('Вы уже зарегистрированы в системе!');
        } else if (result.error.status >= 500) {
          await ctx.reply('Сервер временно недоступен. Попробуйте позже.');
        } else {
          await ctx.reply(result.error.message || 'Произошла ошибка при регистрации.');
        }
      }
      
    } catch (error) {
      console.error('Unexpected error in handleStart:', error);
      await ctx.reply('Произошла неожиданная ошибка. Попробуйте позже.');
    }
  }

  /**
   * Обработчик команды /help
   */
  static async handleHelp(ctx) {
    const helpMessage = `
    🤖 Доступные команды:

    /start - Регистрация в системе
    /help - Показать это сообщение

    Если у вас есть вопросы, обратитесь к администратору.
    `;
    
    await ctx.reply(helpMessage);
  }

  /**
   * Обработчик текстовых сообщений
   */
  static async handleText(ctx) {
    await ctx.reply('Извините, я понимаю только команды. Используйте /help для получения списка доступных команд.');
  }
}

module.exports = BotController;