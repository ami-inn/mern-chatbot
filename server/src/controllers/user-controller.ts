import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {hash,compare} from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constans.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, message: "ok", users });
  } catch (error){
    console.log(error)
    return res.status(200).json({message:"error",cause:error.message})
  } 
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {name,email,password} = req.body;

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(401).json({success:false,message:"user already exist"})
    }

    const hashedPassword = await hash(password,10)

    const user = new User({name,email,password:hashedPassword});

    await user.save();
    
    // create token and store cookie
    res.clearCookie(COOKIE_NAME,{domain:"localhost",httpOnly:true,signed:true,path:'/'})
    const token = createToken(user._id.toString(),user.email,"7d")

    const expires =new Date()
    expires.setDate(expires.getDate()+7)
    res.cookie('auth_token',token,{path:'/',domain:"localhost",expires,httpOnly:true,signed:true})


    return res.status(201).json({ success: true, message: "ok", email:user.email,name:user.name});
  } catch (error) {
    console.log(error);
    return res.status(200).json({message:"ERROR",cause:error.message})
    
  }
};


export const  userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email,password} = req.body;

    console.log('enter heree',req.body);
    

    const user = await User.findOne({email})

    // console.log(user,'userrrr');
    

    if(!user){
       return res.status(401).json({success:false,message:"no user exists"})
    }

    console.log('--------');
    

    const isPasswordCorrect = await compare(password,user.password)

    console.log(isPasswordCorrect,'passss');
    

    if(!isPasswordCorrect){
      return res.status(401).json({success:false,message:"incorrect password"})
    }

    console.log('-----------');
    

    res.clearCookie(COOKIE_NAME,{domain:"localhost",httpOnly:true,signed:true,path:'/'})

    const token = createToken(user._id.toString(),user.email,"7d")

    console.log(token,'tokennn');
    

    const expires =new Date()
    expires.setDate(expires.getDate()+7)
    res.cookie('auth_token',token,{path:'/',domain:"localhost",expires,httpOnly:true,signed:true})


    return res.status(200).json({ success: true, message: "ok", email:user.email,name:user.name});
  } catch (error) {
    console.log(error);
    return res.status(201).json({message:"ERROR",cause:error.message})
    
  }
};