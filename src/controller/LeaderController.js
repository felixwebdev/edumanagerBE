import ROLE from "../config/role.js";
import LeaderService from "../service/LeaderService.js";
import UserService from "../service/UserService.js";
import ApiResponse from "../utils/ApiResponse.js";
class LeaderController {
    async registerCBHV(req, res, next) {
        try {
            const leaderData = req.body;
            const newLeader = await LeaderService.registerLeader(leaderData);
            const newUser = await UserService.register(leaderData.email, leaderData.password, newLeader.id, ROLE.CBHV);
            return ApiResponse.success(res, {
                username: leaderData.email,
                fullname: newLeader.fullname,
                token: newUser.accessToken
            });
        }
        catch(err) {
            next(err);
        }
    }

    async registerBGH(req, res, next) {
        try {
            const leaderData = req.body;
            const newLeader = await LeaderService.registerLeader(leaderData);
            const newUser = await UserService.register(leaderData.email, leaderData.password, newLeader.id, ROLE.BGH);
            return ApiResponse.success(res, {
                username: leaderData.email,
                fullname: newLeader.fullname,
                token: newUser.accessToken
            });
        }
        catch(err) {
            next(err);
        }
    }
}

export default new LeaderController();