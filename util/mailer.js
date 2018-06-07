const nodemailer = require('nodemailer'),
      aws = require('aws-sdk');

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
    from: 'kevin@bruush.com',
    to,
    subject,
    text: message,
    // ses: { // optional extra arguments for SendRawEmail
    //     Tags: [{
      //         Name: 'tag name',
      //         Value: 'tag value'
      //     }]
      // }
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

// working code using sendmail transport system
// const transporter = nodemailer.createTransport({
//   sendmail: true,
//   newline: 'unix',
//   path: '/usr/sbin/sendmail'
// });

// module.exports = function (to, subject, message) {
//   transporter.sendMail({
//     from: 'sender@example.com',
//     to,
//     subject,
//     text: message
//   }, (err, info) => {
//     console.log(info.envelope);
//     console.log(info.messageId);
//   });
// }