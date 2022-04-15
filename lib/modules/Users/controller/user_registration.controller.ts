import { UserService } from "../services/user.services"
import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

interface IRequest extends Request {
    user: any
}

export default class UserRegistrationController {
    public register = async (req: IRequest, res: Response) => {
        try {
            const schema = Joi.object().keys({
                displayName: Joi.string().regex(/^[a-zA-Z][a-zA-Z ]+$/).min(4).max(30).required().messages({
                    "string.min": "Must have at least 4 characters",
                    "object.regex": "Display name must be alphabetic",
                    "string.pattern.base": "Display name must be alphabetic",
                  }),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required()
            });

            const validate: any = schema.validate(req.body);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const hashedPassword = bcrypt.hashSync(validate.value.password, 8);
            validate.value.password = hashedPassword;

            const user: any = new UserService();
            const getUser: any = await user.fetchUser({ email: validate.value.email })

            if (getUser.success) {
                throw {
                    status: 400,
                    message: "User with provided email address is already exist"
                }
            }

            const register: any = await user.registerUser(validate.value)
            if (!register.success) throw register;

            const token = jwt.sign({ uid: register.data._id, displayName: register.data.displayName, email: register.data.email }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });

            return res.status(200).send({
                data: { _id: register.data._id, displayName: register.data.displayName, email: register.data.email, token: token },
                message: "Account registered successfully",
                success: true
            })
        } catch (error) {
            let errorDoc = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }


}
