const express = require('express');
const router = express.Router();
const userInfoCheck = require('../../public/db/users').userInfoCheck;
const jwtSender = require('../api/auth/jwt').sender;

router.post('/',userInfoCheck,jwtSender);

module.exports = router;