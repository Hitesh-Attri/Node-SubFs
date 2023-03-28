/**
 *
 * Run:
 *
 */
// const mailjet = require('node-mailjet').connect(
//     process.env.MJ_APIKEY_PUBLIC || "3b8ad8aad1c6e8a30780ee4516c9325e",
//     process.env.MJ_APIKEY_PRIVATE || "bc303ba28ac31a9dd2513b0c696e3d27"
// )

const Mailjet = require('node-mailjet')

const mailjet = new Mailjet({
    apiKey: "3b8ad8aad1c6e8a30780ee4516c9325e",
    apiSecret: "bc303ba28ac31a9dd2513b0c696e3d27"
  });


module.exports = function (email, callback) {

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'tsh123h@gmail.com',
                    Name: 'tsh',
                },
                To: [
                    {
                        Email: email,
                        Name: 'You',
                    },
                ],
                Subject: 'My first Mailjet Email!',
                TextPart: 'Greetings from Mailjet!',
                HTMLPart:
                    '<h3>Dear passenger 1, welcome to <a href="https://www.google.com/" target="_blank">google</a>!</h3><br />May the delivery force be with you!',
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
            callback(null,result.body);
        })
        .catch(err => {
            // console.log(err.statusCode)
            console.log(err);
            callback(err,null);
        })

}







// res.render('root', { loggedOut:2, msg:"You can login now!"});
                        // return;
                        // sendEmailsMailJet(obj.email,(err,data)=>{
                        //     if(!err)
                        //         res.render('root', { loggedOut:2, msg:"You can login now!"});
                        //     else
                        //         res.render('404');
                        // })