import User from "../models/User.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ success: true, message: "ok", users });
    }
    catch (error) { }
};
//# sourceMappingURL=user-controller.js.map