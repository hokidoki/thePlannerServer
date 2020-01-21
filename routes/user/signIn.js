const express = require('express');
const router = express.Router();
const verify = require('../../public/db/users').verify;

router.post('/',verify,)

module.exports = router;