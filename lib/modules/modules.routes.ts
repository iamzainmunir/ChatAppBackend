import { UserRegistrationRoute } from './Users/user.route';
import { ChatRoutes } from './Chat/chat.routes';

export default class Routes {
    public initializeRoutes = (app: any) => {
        const userRegistrationRoute = new UserRegistrationRoute(),
        chatRoutes = new ChatRoutes();

        userRegistrationRoute.initialize(app, this.BASEURL);
        chatRoutes.initialize(app, this.BASEURL);
    }


    private BASEURL: string = "/api/v1";
}