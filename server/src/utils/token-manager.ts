
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'
import { COOKIE_NAME } from './constans.js'

config()

export const createToken = (id:string,email:string,expiresIn)=>{
    const payload = {id,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn
    })

    return token

}


export const verifyToken = async (req:Request,res:Response,next:NextFunction)=>{

    const token = req.signedCookies[`${COOKIE_NAME}`]

    if(!token || token.trim() === ""){
        return res.status(401).json({message:"Token Not Recieved"})
    }

    console.log(token);

    return new Promise<void>((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                reject(err.message)
                return res.status(401).json({message:"token expired"})
            }else{
                console.log('token verification successfull');

                resolve()
                res.locals.jwtData= success
                return next()
                
            }
        })
    })
    

}