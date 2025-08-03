const db = require('../models');
const UserModel = db.user;

class UserController {
    constructor() {}

    async create(req, res) {
        const data = req.body;

        // Проверка наличия данных
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Нет значений для создания' });
        }

        const check = await UserModel.findOne({
            where: {
                tg_id: data.telegram_id
            } 
        })

        if(check){
           return res.json({ message: "Вы уже зарегестрированы" });
        }

        try {
            const newUser = await UserModel.create({
                tg_id: data.telegram_id,
                tg_username: data.username,
                firstname: data.first_name || null,
                lastname: data.last_name || null,
                language_code: data.language_code,
            });

            return res.json({ message: "Вы успешно зарегестрированы" });
        } catch (err) {
            return res.status(500).json({ error: 'Ошибка при создании пользователя', details: err.message });
        }
    }
}

module.exports = new UserController();