import User from "../models/User.js";
import { OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        // console.log('fkdksdkjlskjkajkljkl');
        const { message } = req.body;
        // console.log(req.body,'jafksddjjjksakjldlkjklj');
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: "user not registered or token malfunctioned" });
        }
        // find chat of the user and send all chat with new one
        // get latest response
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" }); // storing all chats in the static array 
        user.chats.push({ content: message, role: "user" });
        // sending chat to openai
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: chats });
        // get latest chat
        user.chats.push(chatResponse.data.choices[0].message); // role and the content
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error, "errorrrrrrrrrr");
        res.status(400).json({ message: "something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: res.locals.jwtData.id });
        console.log(user, 'userrrr');
        if (!user) {
            return res.status(401).json({ success: false, message: "user not registered or token malfunctioned" });
        }
        console.log('--------');
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ success: false, message: "permission didnt match" });
        }
        return res.status(200).json({ success: true, message: "ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(201).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChat = async (req, res, next) => {
    try {
        console.log('enter heree____________________');
        const user = await User.findById({ _id: res.locals.jwtData.id });
        console.log(user, 'userrrr');
        if (!user) {
            return res.status(401).json({ success: false, message: "user not registered or token malfunctioned" });
        }
        console.log('--------');
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ success: false, message: "permission didnt match" });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ success: true, message: "ok dleeted" });
    }
    catch (error) {
        console.log(error);
        return res.status(201).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map