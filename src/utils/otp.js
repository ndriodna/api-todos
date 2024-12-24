export default function generateOTP() {
    let otp = ''
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 9) + 1
    }
    return otp
}