import UserModel from "../user_registration.model"
import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

const Joi = require('joi');

// This API is used to fetch all users except currently logged in user
export default class UserListController {
    public fetch = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    "string.pattern.base": "User id must be a valid ObjectId",
                  }),
                name: Joi.string().optional()
            });

            const validate: any = schema.validate({ ...req.params, ...req.query});
            if (validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            let query: any = {
                _id: { $ne: validate.value.userId }
            };
            if (validate.value.name) query.displayName = { $regex: validate.value.name, $options: "i" }

            const users: any = await UserModel.find(query).select({ password: 0 });

            return res.status(200).send({
                list: users,
                message: "Successfully fetched list of users",
                success: true
            })
        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
