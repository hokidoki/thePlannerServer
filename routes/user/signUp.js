const express = require('express');
const router = express.Router();
const idCheck = require('../../public/db/users').idCheck;
const signUp = require('../../public/db/users').signUp;
const emailCheck = require('../../public/db/users').emailCheck;

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

router.post('/',idCheck,emailCheck,signUp);

module.exports = router;