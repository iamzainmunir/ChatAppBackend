import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

import ChatModel from "../chat.model"
import { UserService } from "../../Users/services/user.services"

const Joi = require('joi');

interface IRequest extends Request {
    user: any
}

export default class ChatController {
    public sendMessage = async (req: IRequest, res: Response) => {
        try {
            const schema = Joi.object().keys({
                message: Joi.string().min(1).required(),
                receiver: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
                timestamp: Joi.date().optional()
            });

            const validate: any = schema.validate(req.body);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }
            
            if(validate.value.receiver === req.user.user_id){
                throw {
                    status: 400,
                    message: "You can't send message to yourself"
                }
            }

            const user: any = new UserService();
            const getUser: any = await user.fetchUser({ _id: validate.value.receiver })
            if (!getUser.success) {
                throw {
                    status: 404,
                    message: "Receiver not found"
                }
            }

            const messageObject: any = {
                message: req.body.message,
                receiver: [req.user.user_id, req.body.receiver],
                sender: req.user.user_id,
            }

            if(validate.value.timestamp) {
                messageObject.timestamp = validate.value.timestamp
            }

            await ChatModel.create(messageObject);

            return res.status(200).send({
                message: "Message sent successfully",
                success: true
            })
        } catch (error) {
            let errorDoc = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
