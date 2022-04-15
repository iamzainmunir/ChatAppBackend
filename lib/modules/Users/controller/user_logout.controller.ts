import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

interface IRequest extends Request {
    user: any
}

export default class UserLogoutController {
    public logout = async (req: IRequest, res: Response) => {
        try {            
            // Remove user from global users online list
            (globalThis as any).onlineUsers.delete(req.user.user_id);

            return res.status(200).send({
                success: true,
                message: "Logout successfully"
            })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
