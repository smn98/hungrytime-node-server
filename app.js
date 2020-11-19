const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 80, () => {
  console.log("The server started on port 80 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to HunngryTime <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"HungryTime"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Thanks for subscribing to HungryTime 🍖🥗", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for subscribing to our newsletter.</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
