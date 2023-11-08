import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { COOKIE_NAME } from './constans.js';
config();
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    // console.log('enteredd',req.signedCookies);
    const token = req.signedCookies[`${COOKIE_NAME}`];
    // console.log(token);
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Recieved" });
    }
    console.log(token);
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "token expired" });
            }
            else {
                console.log('token verification successfull');
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map