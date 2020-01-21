const mysql_dbc = require('./dbConfig')();
const connection = mysql_dbc.init();
const jwt = require('jsonwebtoken');


module.exports = {
    verify : (req,res,next) =>{
        const {userId,userPassword} = req.body;
        const procedure = `
            call getUserInfo('${userId}','${userPassword}')
        `;
        connection.query(procedure,(err,result)=>{
            if(err){
                next(err)
            }
    
            if(result[0][0].valid === 1){
                const { nick_name, id } = result[0][0];
                const sign = req.app.get('jwt-secret'); 
                console.log(`verify ${userId}`);
                
                const token = jwt.sign({
                    userId : id
                },sign,{
                    expiresIn : '5m'
                })
    
                res.cookie('userToken',token);
                res.send(nick_name);
                
            }else{
                console.log(`not verify ${userId}`);
                res.status('403').send('아이디 혹은 비밀번호를 확인하세요.');
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
        const {id, password, email, termsStatus, nickName} = req.body;
    
        const procedure = `call signup('${id}','${password}','${email}','${termsStatus}','${nickName}')`
        
        connection.query(procedure,(err,result)=>{
            if(err){
                next(err);
            }else{
                next();
            }
        })
    }
}

