const jwt = require('jsonwebtoken');

module.exports = {
    decoder :(token,sign)=>{
        return jwt.decode(toekn,sign);
    }
    ,emailVerifySender : (req,res,next) =>{
        const { email } = req.params;
        const { secretcode } = req.query.secretcode;
        const sign = req.app.get('jwt-secret'); 

        const token = jwt.sign({
            email : email,
            secretcode, secretcode
        },sign,{
            expiresIn : '1m'
        })

        res.cookie('verifyToken',token);
        res.send({
            verify : true
        })
    }
    ,sender : (req,res,next)=>{
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
            failed : {
                reason : null,
                email : null
            }
        });
    },logoutChecker : (req,res,next) =>{
        const token = req.cookies.userToken
        console.log(token);
        if(token){
            try{
                const sign = req.app.get('jwt-secret'); 
                let decoded = jwt.verify(token, sign);
                console.log(decoded);
                console.log(`jwtCheck : ${decoded.userId}`);
                if(decoded){
                    res.status(401).send(new Error("잘못된 접근입니다."));
                }
                else{
                    next();
                }
            }catch(e){
                if(e.name === 'TokenExpiredError'){
                    next();
                }else{
                    next(e);
                }
            }
        }else{
            next();
        }
    }
}