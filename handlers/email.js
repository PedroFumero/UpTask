const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const emailConfig = require('../config/email')
const path = require('path')

const transport = nodemailer.createTransport(emailConfig)

const generateHTML = (options) => {
  const html = pug.renderFile(
    path.join(__dirname, '..', 'views', 'emails', `${options.file}.pug`),
    { url: options.url }
  )
  return juice(html)
}

const sendMail = async (options) => {
  const html = generateHTML(options)
  const text = htmlToText.htmlToText(html)

  const mailOptions = await transport.sendMail({
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text, // plain text body
    html, // html body
  })
  transport.sendMail(mailOptions)
}

module.exports = sendMail
