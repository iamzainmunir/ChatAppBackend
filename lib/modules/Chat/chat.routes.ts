import SendMessageController from "./controller/chat.send_message.controller"
import FetchMessageController from "./controller/chat.fetch_message.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";

export class ChatRoutes {
  public initialize(app: any, baseUrl: string): void {

    const sendMessageController = new SendMessageController(),
    fetchMessageController = new FetchMessageController();

    app
      .route(baseUrl + "/sendMessage")
      .post(UserAuthentication, sendMessageController.sendMessage);

    app
      .route(baseUrl + "/fetchMessage/:userId")
      .get(UserAuthentication, fetchMessageController.fetchMessage);
  }
}
