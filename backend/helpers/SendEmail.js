const nodeMailer = require('nodemailer')
const fs = require("fs");
require('dotenv').config()
const transport = nodeMailer.createTransport({
    service: 'gmail',
    pool: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
const mailBody = {
    from: process.env.EMAIL,
    text: 'Please find the invoice in the attachement.',
    attachments: {
        filename: 'Invoice.pdf',
    }
}
transport.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('server is ready to send emails');
    }
})
const sendmail = async (email, subject, fileName) => {
    mailBody.to = email
    mailBody.subject = subject
    const path = process.cwd() + `\\helpers\\${fileName}.pdf`;
    const elements = path.split('\\');
    let actualPath = ""
    for (let i = 0; i < elements.length - 1; i++)
        actualPath += elements[i] + "/"
    actualPath += elements[elements.length - 1];
    mailBody.attachments.path = actualPath
    return new Promise((resolve, reject) => {
        transport.sendMail((mailBody), (err, data) => {
            if (err) {
                reject(err)
            }
            fs.unlinkSync(mailBody.attachments.path)
            resolve(true)
        })
    })
}
module.exports = sendmail;