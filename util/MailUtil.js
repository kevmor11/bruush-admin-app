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
module.exports = (to, subject, html) => {
  transporter.sendMail({
    from,
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'logo.png',
        path: __dirname + '/../public/images/logo.png',
        cid: 'logo@cid'
      },
      {
        filename: 'facebook.png',
        path: __dirname + '/../public/images/facebook.png',
        cid: 'facebook@cid'
      },
      {
        filename: 'instagram.png',
        path: __dirname + '/../public/images/instagram.png',
        cid: 'instagram@cid'
      }
    ]
  }, (err, info) => {
    if (err) {
      console.log("Error: ", err);
      console.log(info.envelope);
      console.log(info.messageId);
      return false;
    } else {
      console.log("Nodemailer sent an email successfully!");
      return true;
    }
  });
};