const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')

let transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user, // generated ethereal user
    pass: emailConfig.pass, // generated ethereal password
  },
})

// Generate HTML
const generateHTML = (file, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${file}.pug`,
    options
  )
  return juice(html)
}

const sendRecoveryToken = async (options) => {
  const html = generateHTML(options.file, options)
  const text = htmlToText.htmlToText(html)

  let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: options.user.email, // list of receivers
    subject: options.subject, // Subject line
    text, // plain text body
    html, // html body
  }
  await transporter.sendMail(mailOptions)
}

module.exports = {
  sendRecoveryToken,
}
