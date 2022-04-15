import UserRegistrationController from "./controller/user_registration.controller"
import UserLoginController from "./controller/user_login.controller"
import UserListController from "./controller/user.fetch_list.controller";
import UserLogoutController from "./controller/user_logout.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";

export class UserRegistrationRoute {
  public initialize(app: any, baseUrl: string): void {

    const userRegistrationController = new UserRegistrationController(),
    userLoginController = new UserLoginController(),
    userListController = new UserListController(),
    userLogoutController = new UserLogoutController();

    app
      .route(baseUrl + "/user/registration")
      .post(userRegistrationController.register);

    app
      .route(baseUrl + "/user/login")
      .post(userLoginController.login);
    
    app
      .route(baseUrl + "/user/logout")
      .post(UserAuthentication, userLogoutController.logout);

    app
      .route(baseUrl + "/user/list/:userId")
      .get(UserAuthentication, userListController.fetch);
      
  }
}
