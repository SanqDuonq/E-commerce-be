import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

class AuthRepository {
    async findEmail(email: string) {
        return await User.findOne({email});
    }

    async createUser(user: IUser) {
        return await User.create(user);
    }

    async verifyUser(email: string) {
        return await User.findOneAndUpdate({
            email,
            isVerify: true
        })
    }

    async updatePassword(email: string, hashPassword: string) {
        return await User.updateOne({
            email,
            password: hashPassword
        })
    }


}

export default new AuthRepository();