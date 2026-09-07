import { emailSchema } from "../validators/email.validator.js";

export const validateEmail = (req, res, next) => {

    const result = emailSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: result.error.issues[0].message
        });
    }

    next();
};