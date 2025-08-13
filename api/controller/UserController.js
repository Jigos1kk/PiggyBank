require('dotenv').config();

const db = require('../models')
const bcrypt = require('bcrypt');
const UserModel = db.user;

class UserController {
    constructor(){
        //..
    }

    async signUp(req, res){
        const { login, password } = req.body;

        if( !login || !password ){
            return res.status(400).json({ error: "Указаны не полные данные" })
        }

        try{
            const existingUser = await UserModel.findOne({ where: { login } })

            if(existingUser){
                return res.status(409).json({ error: 'Пользователь с таким логином уже существует' })
            }

            const hashedPass = await bcrypt.hash(password, 16);

            const newUser = await UserModel.create({
                login,
                password: hashedPass
            });

            return res.status(201).json({ message: "Вы успешно зарегестрировались" })

        } catch(err) {
            console.log(err)
            return res.status(500).json({ error: "Ошибка сервера" })
        }
    }
}

module.exports = new UserController();