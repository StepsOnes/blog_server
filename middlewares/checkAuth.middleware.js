import jwt from "jsonwebtoken";

const ACCESS__TOKEN = String(process.env.ACCESS__TOKEN)
export const checkAuth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }

        const decoded = jwt.verify(token, ACCESS__TOKEN)
        req.userId = decoded.id


        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}