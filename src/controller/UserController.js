import UserService from "../service/UserService.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../model/User.js";

class UserController {
    async register(req, res, next) {
        try {
            const {username, password} = req.body;

            const result = await UserService.register(username, password);
            return ApiResponse.success(res, result.accessToken);
        }
        catch(err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const result = await UserService.login(username, password);

            return ApiResponse.success(res, {
                accessToken: result.accessToken,
                role: result.role
            });
        }
        catch(err) {
            next(err);
        }
    }
}

export default new UserController();