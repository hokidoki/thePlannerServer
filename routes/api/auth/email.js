const mysql_dbc = require('./dbConfig')();
const connection = mysql_dbc.init();
const mailer = require('nodemailer');


module.exports = {
    postEmail : (req,res,next)=>{
        const { email } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'zhtmah1@gmail.com',
              pass: 'gozld51345'
            }
          });
          
          const mailOptions = {
            from: 'zhtmah1@gmail.com',
            to: `${email}`,
            subject: '더 플래너 가입인증 메일',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
                    
    }
}

