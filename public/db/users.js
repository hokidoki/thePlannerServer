const mysql_dbc = require('./dbConfig')();
const connection = mysql_dbc.init();


module.exports = {
    userInfoCheck : (req,res,next) =>{
        const {id,pw} = req.body;
        const procedure = `
                call getUserInfo('${id}','${pw}')
            `;
        connection.query(procedure,(err,result)=>{
            if(result[0][0].valid === 1){
                if(result[0][0].emailVerify === 0){
                    res.send({
                        loginSuccess : false,
                        failed : {
                            reason : 201,
                            email : result[0][0].email
                        }
                    })
                }else{
                    next();
                }
            }else{
                console.log(`id : ${id} 접속실패`);
                res.send({
                    loginSuccess : false,
                    failed : {
                        reason : 200,
                        email : null
                    }
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
    },
    emailVerify : (req,res,next)=>{
        const email = req.params.email;
        const secretcode = req.query.code;
        
        const validEmailConfirmaition = `call validEmailConfirmaition('${email}')`;

        connection.query(validEmailConfirmaition,(err,result)=>{
            if(err){
                console.log(err);
                next(err);
            }else{
                if(result[0][0].valid === 1){
                    const emailAuthentication = `call emailAuthentication('${email}','${secretcode}')`;
                    connection.query(emailAuthentication,(err,verifyResult)=>{
                        if(err){
                            console.log(err);
                            next(err);
                        }else{
                            console.log(verifyResult);
                            if(verifyResult[0][0].verifyCheck === 1){
                                //제대로 인증이 된 경우
                                res.status(301).redirect('http://localhost:3001');
                            }else{
                                //트랜잭션 오류 .
                            }
                        }
                    })
                }else if(result[0][0].valid === 2){
                    //이미 인증된 이메일인 경우 
                    next(new Error("잘 못된 경로입니다."));
                }else{
                    //이메일이 없는 경우
                    next(new Error("잘 못된 경로입니다."));
                }
            }
            console.log(result);
        })
        
    }
}

