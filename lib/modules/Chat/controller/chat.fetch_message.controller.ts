import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

import ChatModel from "../chat.model"

const Joi = require('joi');

interface IRequest extends Request {
    user: any
}

export default class ChatController {
    public fetchMessage = async (req: IRequest, res: Response) => {
        try {
            const schema = Joi.object().keys({
                userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            });

            const validate: any = schema.validate(req.params);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const messages: any = await ChatModel.find({ receiver: { $all: [req.user.user_id, req.params.userId] } }).select({ message: 1, timestamp: 1, sender: 1 }).sort({ timestamp: 1 });

            // Add additional property to differentiate between self and other user messages
            let filterMessages = messages.map((message: any) => {
                return {
                    self: message.sender === req.user.user_id,
                    message: message.message,
                    timestamp: message.timestamp
                }
            })

            return res.status(200).send({
                list: filterMessages,
                message: "Messages fetched successfully",
                success: true
            })
        } catch (error) {
            let errorDoc = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
