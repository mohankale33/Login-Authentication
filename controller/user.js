const userDB = require('../model/userSchema')
const userIdGenerator = require('../utilities/userIDGenerator');
const validator = require('../utilities/userValidator');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secrete = 'gfshagfhgashdgftebshb@fadsfh'; 

exports.registerUser = async (req, res) => {
    try {
        userPresent = null;
        await validator.emailExist(req.body.email).then(resp => {
            userPresent = resp
        });
        if (validator.validateUserName(req.body.name) &&
            validator.validatePhoneNumber(req.body.phoneNo) &&
            validator.validateEmail(req.body.email) &&
            validator.validatePassword(req.body.password) &&
            !userPresent) {
            const userID = await userIdGenerator.generateUserId();
            const user = await userDB.create(
                {
                    userId: userID,
                    name: req.body.name,
                    email: req.body.email,
                    phoneNo: req.body.phoneNo,
                    password: await bycrypt.hash(req.body.password,10),
                }
            );
            res.status(201);
            res.json({
                status: "Success",
                data: {
                    message: `Successfully Registered with user ID : ${userID}`
                }
            })
        } else if (!validator.validateUserName(req.body.name)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid name with at least 3 characters`
                }
            })
        } else if (!validator.validatePhoneNumber(req.body.phoneNo)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid phone no. with 10 digits`
                }
            })
        } else if (!validator.validateEmail(req.body.email)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid email id`
                }
            })
        } else if (!validator.validatePassword(req.body.password)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid password with at least 8 and not more than 12 characters`
                }
            })
        } else if (validator.emailExist(req.body.email)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `User exists with this email id`
                }
            })
        }

    } catch (error) {
        res.status(404);
        res.json({
            status: "fail",
            message: error
        })
    }
}


exports.userLogin = async (req, res) => {
    try {
        const users = await userDB.findOne({ email: req.body.email}, { _id: 0 });
        if (users &&
            validator.validatePassword(req.body.password) &&
            await bycrypt.compare(req.body.password,users.password)) {
            
            const token = jwt.sign({
                userId:users.userId,
                email: users.email }, jwt_secrete);   
            res.status(201);
            res.cookie('emailID', req.body.email);
            res.json({
                status: `success`,
                data: token
            })
        } else if (!validator.validatePassword(req.body.password)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid password with at least 8 and not more than 12 characters`
                }
            })
        } else {
            res.status(400)
            res.json({
                status: `error`,
                data: {
                    message: `Incorrect user id or password`
                }
            });
        }
    } catch (error) {
        res.status(404);
        res.json({
            status: "fail",
            message: error
        })
    }
}

exports.changePassword = async (req,res) =>{
    try {
        const user = jwt.verify(req.body.token, jwt_secrete);
        const usersData = await userDB.findOne({ email: user.email}, { _id: 0 });
        if (usersData && 
            validator.validatePassword(req.body.password)) {
            const passwordUpdate = await userDB.findOneAndUpdate({ email: user.email},{ $set: { password: await bycrypt.hash(req.body.password,10)} });
            res.status(201);
            res.json({
                status: `success`,
                data: {
                    message: `Password Updated Successfully`
                }
            })
        } else if (!validator.validatePassword(req.body.password)) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `Enter a valid password with at least 8 and not more than 12 characters`
                }
            })
        }
        else if (!users) {
            res.status(400);
            res.json({
                status: "Error",
                data: {
                    message: `User with Email ID is not registered`
                }
            })
        } else {
            res.status(400)
            res.json({
                status: `error`,
                data: {
                    message: `Incorrect user id or password`
                }
            });
        }
    } catch (error) {
        res.status(404);
        res.json({
            status: "fail",
            message: error
        })
    }
}


exports.logoutUser = async (req,res) =>{
    try {
        res.status(201);
            res.clearCookie('emailID');
            res.json({
                status: `success`,
                data: {
                    message: `You are logged out!!`
                }
            })
    } catch (error) {
        res.status(404);
        res.json({
            status: "fail",
            message: error
        })
    }
}