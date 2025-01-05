import { IAuth } from "../interfaces/auth.interface";

class AuthServices implements IAuth {
    async signUp(data: { fullName: string; email: string; phoneNumber: number; profilePicture: string; password: string; }): Promise<void> {
        
    }
    async signIn(data: { email: string; password: string; }): Promise<void> {
        
    }
    async logout(): Promise<void> {
        
    }
    async forgotPassword(data: { email: string; }): Promise<void> {
        
    }
    async resetPassword(data: { email: string; OTP: string; }): Promise<void> {
        
    }
}

const authServices = new AuthServices();
export default authServices;