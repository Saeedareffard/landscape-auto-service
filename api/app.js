"use strict";
const nodemailer = require("nodemailer");
var express = require("express");
var app = express();
const port = process.env.PORT || 3001;
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-CrEdenials', true);
  next();
});

app.get("/email",async function (req, res) {
  var transporter = nodemailer.createTransport({
    host: "mail.niloofarsasannia.com",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "gooji@niloofarsasannia.com",
      pass: "Ci9ybmibvX",
    },
  });

  var mailerOptions = {
    from: "saeedareffard1377666@gmail.com",
    to: req.query.receivingAddress,
    subject:`${req.query.firstName}'s landscape auto services booking request`,
    text: ` Hi ${req.query.firstName},

    your booking request for ${req.query.carName} has been sent.
    
    your requested service is ${req.query.serviceName}

    details: ${req.query.details??'Not mentioned'}

    date: ${req.query.date ?? 'not mentioned'}
    
    we will reach out to you by calling or emailing ASAP.
    
    feel free to call 09 638 9729 if you had any questions.
    
    regards
    
    landscape auto services `,
  };
  
  var ownerMainOption = {
    from: "saeedareffard1377666@gmail.com",
    to: "saeedareffard1377666@gmail.com",
    subject: req.query.subject,
    text: req.query.text,
  };
  
  // await transporter.sendMail(mailerOptions);
   transporter.sendMail(mailerOptions,(err) =>console.log("error is :%s",err));
  console.log("Message sent: %s", ownerMainOption.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(ownerMainOption));
  res.json({ result: ownerMainOption.messageId });
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
});
