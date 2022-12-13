var nodemailer = require("nodemailer");
const config = require("../configData/config");
const email = config.get("local").email;
console.log(email);

export const SendEmail = (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.username,
      pass: email.password,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};