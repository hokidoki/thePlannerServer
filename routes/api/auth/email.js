const mysql_dbc = require('../../../public/db/dbConfig')();
const connection = mysql_dbc.init();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const uuid = require('uuid');

module.exports = {
    postEmail : (req,res,next)=>{
        const { email } = req.body;
        const secretCode = uuid.v1();
        const procedure = `call emailVerify('${email}','${secretCode}')`;
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host : 'smtp.gmail.com',
            auth: {
              user: 'zhtmah1@gmail.com',
              pass: 'gozld51345'
            }
          }));
          
          const mailOptions = {
            from: 'zhtmah1@gmail.com',
            to: `${email}`,
            subject: '더 플래너 가입인증 메일',
            html: `<p>가입 인증 메일 입니다. <a href="http://localhost:3001/verify/${email}?secretcode=${secretCode}">여기</a> 를 클릭해주세요.</p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error); 
              next(error);
            }
            connection.query(procedure,(sqlError)=>{
              if(sqlError){
                console.log(sqlError);
                next(sqlError);
              }

              console.log('Email sent: ' + info.response);
                res.send({
                  id : {
                      valid : true
                  },
                  email : {
                      valid : true
                  }
                })
            })
          });
                    
    }
}

