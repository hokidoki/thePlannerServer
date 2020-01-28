const express = require('express');
const router = express.Router();
const idCheck = require('../../public/db/users').idCheck;
const signUp = require('../../public/db/users').signUp;
const emailCheck = require('../../public/db/users').emailCheck;
const logoutChecker = require('../api/auth/jwt').logoutChecker;
const postEmail = require('../api/auth/email').postEmail;
const validEmailConfirmaition = require('../../public/db/users').validEmailConfirmaition;
const emailVerifySender = require('../api/auth/jwt').emailVerifySender;
const emailAuthentication = require('../../public/db/users').emailAuthentication;

router.post('/idcheck',idCheck,(req,res)=>{
    res.send({
        id : {
            valid : true
        },
        email : {
            valid : false
        }
    });
});

router.post('/',idCheck,emailCheck,signUp,postEmail);

router.get('/verify/:email',validEmailConfirmaition,emailVerifySender);

router.put('/verify/:email',emailAuthentication);
//logoutCHecker추가해야함;
module.exports = router;

