import jwt from 'jsonwebtoken'
const ACCESS__TOKEN = String(process.env.ACCESS__TOKEN)


export const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, ACCESS__TOKEN, {expiresIn: "24h"} )
}