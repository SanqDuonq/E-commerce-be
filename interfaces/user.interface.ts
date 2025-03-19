export interface IUser extends Document {
    fullName: string,
    email: string,
    phoneNumber: number,
    password: string,
    profilePicture: string,
    isVerify: boolean,
    providers: {
        providerName: string,
        providerId: string
    }[]
}

