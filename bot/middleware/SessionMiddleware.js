/**
 * SessionMiddleware
 * Класс для обработки сессии пользователя и сохранения JWT токена.
 * Используется с Telegraf session middleware.
 */
class SessionMiddleware {
  /**
   * Конфиг для Telegraf session middleware.
   * @returns {Object}
   */
  static get sessionConfig() {
    return {
      defaultSession: () => ({
        token: null,
        user: null,
        showClient: false,
        lastActivity: Date.now()
      })
    };
  }

  /**
   * Сохраняет JWT токен в сессию пользователя.
   * @param {Object} ctx - Telegraf context
   * @param {string} token - JWT токен
   */
  static saveTokenToSession(ctx, token) {
    if (ctx.session) {
      ctx.session.token = token;
      ctx.session.lastActivity = Date.now();
    }
  }

  /**
   * Получает JWT токен из сессии пользователя.
   * @param {Object} ctx - Telegraf context
   * @returns {string|null}
   */
  static getTokenFromSession(ctx) {
    return ctx.session && ctx.session.token ? ctx.session.token : null;
  }
}

module.exports = SessionMiddleware;