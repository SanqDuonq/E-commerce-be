export interface IOAuth {
    providerName: 'google' | 'github',
    providerId: string,
    email?: string,
    fullName: string,
    profilePicture?: string
}

export interface IUser {
    fullName: string,
    email: string,
    password?: string,
    profilePicture: string,
    isVerify: boolean,
    oauth?: IOAuth[]
}

export interface IProfile {
    id?: string,
    displayName?: string,
    emails?: {
        value: string,
        verified?: boolean
    }[],
    photos?: {
        value: string
    }[]
}