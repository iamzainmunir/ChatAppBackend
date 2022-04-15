import { UserService } from "../services/user.services"
import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

export default class UserLoginController {
    public login = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });

            const validate: any = schema.validate(req.body);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const user: any = new UserService();
            const getUser: any = await user.fetchUser({ email: validate.value.email });

            if (getUser.success) {
                const isPasswordValid = bcrypt.compareSync(validate.value.password, getUser.data.password);

                if (!isPasswordValid) {
                    throw {
                        status: 400,
                        message: "Invalid email or password"
                    }
                }

                const token = jwt.sign({ uid: getUser.data._id, displayName: getUser.data.displayName, email: getUser.data.email }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                if (!token) {
                    throw {
                        status: 500,
                        message: "Failed to generate token"
                    }
                }

                return res.status(200).send({
                    data: { _id: getUser.data._id, displayName: getUser.data.displayName, email: validate.value.email, token: token },
                    message: "Login successfully",
                    success: true
                })
            }

            throw {
                status: 400,
                message: "Invalid email or password"
            };

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
