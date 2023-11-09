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

    console.log('req.bodyy',req.body);
    

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


export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      sameSite:"none",
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

   
    

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


export const  verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    console.log('enter heree____________________');
    

    

    const user = await User.findById({_id:res.locals.jwtData.id})

    

    console.log(user,'userrrr');
    

    if(!user){
       return res.status(401).json({success:false,message:"user not registered or token malfunctioned"})
    }

    console.log('--------');

    if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).json({success:false,message:"permission didnt match"})
    }
    
    return res.status(200).json({ success: true, message: "ok", email:user.email,name:user.name});
  } catch (error) {
    console.log(error);
    return res.status(201).json({message:"ERROR",cause:error.message})
    
  }
};


export const  userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await User.findById({_id:res.locals.jwtData.id})

    

    if(!user){
       return res.status(401).json({success:false,message:"user not registered or token malfunctioned"})
    }



    if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).json({success:false,message:"permission didnt match"})
    }

    res.clearCookie(COOKIE_NAME,{
      httpOnly:true,
      domain:"localhost",
      signed:true,
      path:"/"
    })
    
    return res.status(200).json({ success: true, message: "ok", email:user.email,name:user.name});
  } catch (error) {
    console.log(error);
    return res.status(201).json({message:"ERROR",cause:error.message})
    
  }
};