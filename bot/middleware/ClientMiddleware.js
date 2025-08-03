const { Markup } = require('telegraf');

/**
 * Middleware для показа мини-приложения, когда в сессии появляется токен.
 * Показывает клавиатуру с кнопкой для запуска мини-приложения (Web App).
 */

const WEB_APP_URL = 'https://playcanv.as/p/2OlkUaxF/';

class ClientMiddleware {
    constructor() {}

    async showClientOnToken(ctx) {
        if (
            ctx.session &&
            ctx.session.token &&
            !ctx.session.showClient
        ) {
            ctx.session.showClient = true;

            await ctx.reply(
                'Кнопка мини-приложения теперь всегда под полем ввода 👇',
                Markup.keyboard([
                    [Markup.button.webApp('Открыть мини-приложение', WEB_APP_URL)]
                ])
                .resize()
                .oneTime(false)
            );
        }
        
        return
    }

}

module.exports = new ClientMiddleware();