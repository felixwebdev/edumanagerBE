import Leader from "../model/Leader.js";

class LeaderService {
    async registerLeader(leaderData) {
        const newLeader = new Leader(leaderData);
        await newLeader.save();
        return {
            id: newLeader._id,
            fullname: newLeader.fullname,
            email: newLeader.email,
        };
    }
}

export default new LeaderService();
