const express = require('express');
const router = express.Router();
const idCheck = require('../../public/db/users').idCheck;
const signUp = require('../../public/db/users').signUp;
const emailCheck = require('../../public/db/users').emailCheck;
const logoutChecker = require('../api/auth/jwt').logoutChecker;
const postEmail = require('../api/auth/email').postEmail;
const emailVerify = require('../../public/db/users').emailVerify;

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

router.get('/verify/:email',emailVerify)
//logoutCHecker추가해야함;
module.exports = router;

