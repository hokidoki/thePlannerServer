const express = require('express');
const router = express.Router();
const idCheck = require('../../public/db/users').idCheck;

router.post('/idcheck',idCheck);

module.exports = router;