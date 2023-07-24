const express = require("express");
const router = express.Router();
const user_methods = require("../methods/user_method")

//POST / Add new user
router.post('/addnewuser', user_methods.add_new_user)

//POST / Login user
router.post('/loginuser', user_methods.compare_password)

module.exports = router;