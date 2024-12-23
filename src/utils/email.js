import { createTransport } from 'nodemailer'

const emailTemplate = (content) => {
    return `
        <style>
    * {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    }
</style>
<body>
    <div style="display: flex; align-items: center; flex-direction: column; justify-content: center; height: auto;">
        <div style="height: 50px; width: 100%; background-color: #d2dff7; display: flex; justify-content: center; align-items: center; text-transform: uppercase; font-weight: 900; font-size: xx-large;"><p>todo</p></div>
        ${content}
        <div style="height: 50px; width: 100%; background-color: #d2dff7;"></div>
    </div>
</body>
    `
}
const forgotPasswordTemplate = (userMail, otp) => {
    const content = `
         <h1 style="text-transform: capitalize; font-weight: 900;">change your password</h1>
        <div >
            <p>We have received a password change request for your account</p>
            <p>${userMail}</p>
            <p>If you did not ask for change password, then you can ignore this email</p>
            <p>the otp code below remain active <b>1 hour</b></p>
            <div style="padding: 10px 4px 10px 4px; background-color: #88aaee; color: white; text-align: center; font-weight: bold; font-size: larger; border-radius: 12px;text-transform: capitalize;">${otp}</div>
        </div>
    `
    return emailTemplate(content)
}

const registerTemplate = (userMail, token) => {
    const content = `
     <h1 style="text-transform: capitalize; font-weight: 900;">verify your account</h1>
        <div >
            <h3>hey ${userMail}</h3>
            <p>please complete verify registation account below</p>
            <div style="padding: 10px 4px 10px 4px; background-color: #88aaee; color: white; text-align: center; font-weight: bold; font-size: larger; border-radius: 12px;text-transform: capitalize;"><a href="http://localhost:5173/register/${token}"></a></div>
        </div>
    `
    return emailTemplate(content)
}

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS
    }
})
const mailtrapTransportner = createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_EMAIL,
        pass: process.env.MAILTRAP_PASS
    }
})


async function sendMail(mail) {
    try {
        const info = await mailtrapTransportner.sendMail({
            from: { name: 'cs', address: 'dummyforwebdev@gmail.com' },
            to: mail.to,
            subject: mail.subject,
            html: mail.html
        })
        console.log('mail', info.messageId)
        return info.messageId
    } catch (error) {
        console.log(error)
    }
}

async function SendEmailResetPassword(email, otp) {
    const data = {
        to: email,
        subject: 'password change request',
        html: forgotPasswordTemplate(email, otp)
    }
    await sendMail(data)
}



export { SendEmailResetPassword } 