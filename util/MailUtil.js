const nodemailer = require('nodemailer'),
      aws = require('aws-sdk'),
      from = require('../config/configs').sendFromMail;

aws.config = new aws.Config();
aws.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
aws.config.region = "us-west-2";

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01'
  })
});

// send some mail
module.exports = (to, subject, message) => {
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
