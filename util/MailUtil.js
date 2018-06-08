const nodemailer = require('nodemailer'),
      aws = require('aws-sdk'),
      from = require('../config/configs').sendFromMail;

// configure AWS SDK
aws.config.loadFromPath('aws-config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01'
  })
});

// send some mail
module.exports = function (to, subject, message) {
  transporter.sendMail({
    from,
    to,
    subject,
    text: message
  }, (err, info) => {
    if (err) {
      console.log("Error: ", err);
      console.log(info.envelope);
      console.log(info.messageId);
    } else {
      console.log("Nodemailer sent an email successfully!");
    }
  });
};
