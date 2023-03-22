const nodemailer = require("nodemailer");

const sendEmail = async (req, callback)=>{
    console.log(req.body, typeof req.body, " <<<")
    console.log("testing sendEmail.js from export");

    let userEmail = req.body.email;

    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'adolfo.kuhlman@ethereal.email', // this field can be different
            pass: 'kHQHE4k6sQeVdNgfdM' // this field can be different, Ethereal
        },
      });

      // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Bunty 👻" <bunty1@example.com>', // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: userEmail, // list of receivers
        subject: "Testing mail", // Subject line
        text: "Hello world?", // plain text body
        html: `
            <b>Hello world?</b> <br> ${req.body.email}
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);

    callback(info);   
}

module.exports = sendEmail;