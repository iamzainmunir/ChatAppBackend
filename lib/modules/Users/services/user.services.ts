import UserModel from "../user_registration.model"

export class UserService {
  public fetchUser = async (query: any) => {
    try {
        const fetchUser = await UserModel.findOne(query);
        if(!fetchUser){
           throw {
               status: 404,
               message: "No user found"
           }
        }

        return {
          data: fetchUser,
          success: true
        };
    } catch (error) {
        return error;
    }
  }
    
  public registerUser = async (query: any) => {
    try {
      const registerUser = await UserModel.create(query);
      return {
        data: registerUser,
        success: true
      }

    }catch (error) {
     return error;
    } 
  }

}
