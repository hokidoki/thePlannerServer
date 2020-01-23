const mysql_dbc = require('./dbConfig')();
const connection = mysql_dbc.init();


module.exports = {
    userInfoCheck : (req,res,next) =>{
        const {id,pw} = req.body;
        console.log(req.cookies)
        const procedure = `
                call getUserInfo('${id}','${pw}')
            `;
        console.log(id,pw)
        connection.query(procedure,(err,result)=>{
            if(result[0][0].valid === 1){
                next();
            }else{
                console.log(`id : ${id} 접속실패`);
                res.send({
                    loginSuccess : true,
                    failedReason : null
                })
            }
        })

    },
    idCheck : (req,res,next)=>{
        const { id } = req.body;
        const query = `select count(*) as valid from account where id = '${id}'`;

        connection.query(query,(err,result)=>{
            if(err){
                console.log(err);
                next(err);
            }else if(result[0].valid === 1){
                res.send({
                    id : {
                        valid : false
                    },
                    email : {
                        valid : false
                    }
                });
            }else{
                next();
            }
        })
    },
    emailCheck : (req,res,next) =>{
        const { email } = req.body;
        const query = `select count(*) as valid from account where email = '${email}'`;
        connection.query(query,(err,result)=>{
            if(err){
                console.log(err);
                next(err);
            }else if(result[0].valid === 1){
                res.send({
                    id : {
                        valid : true
                    },
                    email : {
                        valid : false
                    }
                })
            }else{
                next();
            }
        })
    },signUp : (req,res,next)=>{
        const {id, password, email, termsStatus, nickname} = req.body;
        let term = 0;
        if(termsStatus === false){
            next(new Error("올바르지 못한 접근입니다."))
        }else{
            term = 1;
        }
        const procedure = `call signUp('${id}','${password}','${nickname}','${email}',${term})`
        
        connection.query(procedure,(err)=>{
            if(err){
                console.log(err);
                next(new Error("올바르지 못한 가입 접근입니다.."));
            }else{
                next();
            }
        })
    }
}

