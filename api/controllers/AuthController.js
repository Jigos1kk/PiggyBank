require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = require('../models');
const UserModel = db.user;

class AuthController {
    constructor(){
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
    }

    /**
     * Генерирует JWT токен для пользователя
     * @param {Object} user - объект пользователя
     * @returns {string} JWT токен
     */
    async token_generate(user){
        try {
            const payload = { user };

            const token = jwt.sign(
                payload,
                this.JWT_SECRET,
                { 
                    expiresIn: this.JWT_EXPIRES_IN,
                    issuer: 'piggy-bank'
                }
            );

            return token;
        } catch (error) {
            throw new Error('Ошибка при генерации токена: ' + error.message);
        }
    }

    /**
     * Расшифровывает и верифицирует JWT токен
     * @param {string} token - JWT токен
     * @returns {Object} декодированные данные пользователя
     */
    async token_verify(token){
        try {
            // Убираем "Bearer " если он есть в начале токена
            const cleanToken = token.replace('Bearer ', '');
            
            const decoded = jwt.verify(cleanToken, this.JWT_SECRET);
            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Токен истек');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Недействительный токен');
            } else {
                throw new Error('Ошибка при верификации токена: ' + error.message);
            }
        }
    }

    /**
     * Извлекает токен из заголовка Authorization
     * @param {Object} req - объект запроса Express
     * @returns {string|null} токен или null если не найден
     */
    _extractTokenFromHeader(req) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }
        return null;
    }

    /**
     * Middleware для проверки авторизации
     * @param {Object} req - объект запроса Express
     * @param {Object} res - объект ответа Express
     * @param {Function} next - функция next
     */
    async authMiddleware(req, res, next) {
        try {
            const token = this._extractTokenFromHeader(req);
            
            if (!token) {
                return res.status(401).json({ 
                    error: 'Токен не предоставлен' 
                });
            }

            const decoded = await this.token_verify(token);
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).json({ 
                error: error.message 
            });
        }
    }
}

module.exports = new AuthController();