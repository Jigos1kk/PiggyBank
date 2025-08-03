const db = require('../models');
const UserModel = db.user;
const AuthController = require('./AuthController')

class UserController {
    constructor() {}

    async create(req, res) {
        const data = req.body;

        // Проверка наличия данных
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Нет значений для создания' });
        }

        try {
            const user = await UserModel.findOne({
                where: {
                    tg_id: data.telegram_id
                }
            });

            if (user) {
                const token = await AuthController.token_generate(user);
                return res.status(200).json({
                    message: "Вы уже зарегистрированы",
                    token
                });
            }

            const newUser = await UserModel.create({
                tg_id: data.telegram_id,
                tg_username: data.username,
                firstname: data.first_name || null,
                lastname: data.last_name || null,
                language_code: data.language_code,
            });

            const token = await AuthController.token_generate(newUser);

            return res.status(200).json({
                message: "Вы успешно зарегистрированы",
                token
            });
        } catch (err) {
            return res.status(500).json({
                error: 'Ошибка при создании пользователя',
                details: err.message
            });
        }
    }

    async show(req, res) {

    }
}

module.exports = new UserController();