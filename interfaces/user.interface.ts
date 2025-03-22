export interface IUser {
    fullName: string,
    email: string,
    phoneNumber: number,
    password: string,
    profilePicture: string,
    isVerify: boolean,
    oauth: {
        googleId?: string
    }
}

export interface IProfileGoogle {
    id: string,
    displayName: string,
    emails?: {
        value: string,
        verified?: boolean
    }[],
    photos?: {
        value: string
    }[]
}