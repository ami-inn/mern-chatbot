
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const createToken = (id:string,email:string,expiresIn)=>{
    const payload = {id,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn
    })

    return token

}