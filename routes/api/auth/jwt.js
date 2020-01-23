const jwt = require('jsonwebtoken');

module.exports = {
    sender : (req,res,next)=>{
        const { id } = req.body;    
        const sign = req.app.get('jwt-secret'); 
        console.log(`verify : ${id}`);
        const token = jwt.sign({userId : id
        },sign,{
        expiresIn : '10m'
        })
        res.cookie('userToken',token);
        res.send({
            loginSuccess : true,
            failedReason : null
        });
    },logoutChecker : (req,res,next) =>{
        const token = req.cookies.userToken;
        console.log(req.cookies);
        const sign = req.app.get('jwt-secret');
        let decoded = jwt.verify(token, sign);
        console.log(decoded);
        if(decoded){
            next(new Error("잘 못된 접근입니다."))
        }
        else{
            next();
        }
    }
}