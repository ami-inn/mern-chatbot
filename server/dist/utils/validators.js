import { body, validationResult } from 'express-validator';
export const validate = (validations) => {
    console.log('entrerrrrrrrrrdddd');
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            console.log('sucess');
            return next();
        }
        res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6 }).withMessage('password should contain atleas 6 character')
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidator,
];
export const messageValidator = [
    body("message").notEmpty().withMessage("Message is Required"),
];
//# sourceMappingURL=validators.js.map