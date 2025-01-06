export interface IAuth {
    signIn(data: {email:string,password:string}):Promise<void>,
    signUp(data: {fullName:string,email:string,phoneNumber:number,profilePicture:string,password:string}): Promise<{userId:string}>,
    verifyEmail(data:{email:string,OTP:string}):Promise<void>,
    logout(): Promise<void>,
    forgotPassword(data: {email:string}): Promise<void>,
    resetPassword(data: {email:string,OTP:string}):Promise<void>
}