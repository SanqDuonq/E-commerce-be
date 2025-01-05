export interface IUser {
    fullName: string,
    email: string,
    phoneNumber: number,
    profilePicture: string,
}

export interface IUserMethod {
    password: string,
    verifyOTP: string,
    verifyOTPExpiredAt: Date,
    resetOTP: string,
    resetOTPExpiredAt: Date
}

