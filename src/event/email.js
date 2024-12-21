import { EventEmitter } from 'node:events'
import { createTransport } from 'nodemailer'

const emailEvent = new EventEmitter()

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: 'dummyforwebdev@gmail.com',
        pass: 'ibvv qeju xblj psam'
    }
})
async function message(mail) {
    try {
        const info = await transporter.sendMail({
            from: { name: 'cs', address: 'dummyforwebdev@gmail.com' },
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        })
        console.log('mail', info)
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.log(error)
    }
}
emailEvent.on('forgotPasswordMail', message)
emailEvent.on('registerMail', message)

export default emailEvent 