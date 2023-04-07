const router = require('express').Router();
const mailController = require("../controller/contactController");


router.post('/', mailController);


module.exports = router;