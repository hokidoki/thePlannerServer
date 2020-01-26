const express = require('express');
const router = express.Router();
const userInfoCheck = require('../../public/db/users').userInfoCheck;
const jwtSender = require('../api/auth/jwt').sender;
const logoutChecker = require('../api/auth/jwt').logoutChecker;

router.post('/',logoutChecker,userInfoCheck,jwtSender);

module.exports = router;