import User from "../models/User.js";
import bcrypt from 'bcrypt'
import {generateAccessToken} from "../utils/generateToken.utils.js";

const ACCESS__TOKEN = process.env.ACCESS__TOKEN
class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body

            const isUsed = await User.findOne({ username })

            if (isUsed) {
                res.status(400).json({ message: 'Пользователь с данным именем уже существует' })
                return;
            }

            const hashPassword = bcrypt.hashSync(password, 7)

            const user = await User.create({
                username,
                password: hashPassword
            })
            const token = generateAccessToken(user._id)
            await user.save()

            res.json({message: "Пользователь успешно зарегистрирован", token})
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = generateAccessToken(user._id)

            res.json({
                message: 'Вы успешно авторизованны',
                token,
                user
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUser(req, res, next) {
        try {
            const users = await User.find({})

            res.json(users)
        } catch (err) {
            console.log(err)
        }
    }
}

export default new AuthController()