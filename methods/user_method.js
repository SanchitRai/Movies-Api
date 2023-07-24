const User = require("../schemas/user");
const jwt = require("jwt-simple");
const config = require("../config/db_config");

var functions = {
    add_new_user: async function (req, res) {
        try {

            var obj = req.body;
            if ((!obj.email) || (!obj.password)) {
                res.json({
                    success: false,
                    msz: "Enter all fields"
                });
            }
            else {
                var newUser = User({
                    email: obj.email,
                    password: obj.password
                });
                var user = await User.findOne({
                    email: obj.email
                });
                if (!user) {
                    var newUserInfo = await newUser.save();
                    var token = jwt.encode(newUserInfo, config.secret);
                    res.json({
                        success: true,
                        msz: "Successfully Created New User",
                        token: token
                    });
                }
                else {
                    res.json({ success: false, msz: "User Already Exist,Try to Login" });
                }
            }
        } catch (error) {
            res.send({
                success: false,
                msz: "An error occurred",
                error: error
            });
        }
    },
    compare_password: async function (req, res) {
        try{
        var obj = req.body;
        const userInfo = await User.findOne({
            email: obj.email
        });
            if (userInfo === null) {
                res.send({ success: false, msz: "Authentication Failed,User Not Found", err: null });
            }
            else {
                userInfo.comparePassword(obj.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(userInfo, config.secret);
                        res.json({
                            success: true,
                            token: token,
                            err: null
                        });
                    }
                    else {
                        return res.send({
                            success: false,
                            msz: "Authentication Failed,Wrong Password"
                        });
                    }
                });
            }
                   
    }catch(error){
        return res.send({
            success: false,
            msz: "An error occurred",
            error: error
        });
    }
    }
}

module.exports = functions;