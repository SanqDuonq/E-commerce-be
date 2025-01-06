import otpGenerator from 'otp-generator';

const GenerateOTP = () => {
    return otpGenerator.generate(6,{
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
}

export default GenerateOTP;