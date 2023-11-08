import User from "../models/User.js";
import { OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, Response, NextFunction) => {
    try {
        const { message } = req.body;
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
        console.log(error);
        res.status(400).json({ message: "something went wrong" });
    }
};
//# sourceMappingURL=chat-controller.js.map