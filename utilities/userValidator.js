const userDB = require('../model/userSchema');


exports.validateUserName = (name) => {
    if (name.trim().length >= 3) {
        return true;
    } else {
        return false;
    }
}


exports.validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.toString().length == 10) {
        return true;
    }else{
    return false;
    }
};

exports.validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

exports.validatePassword = (password) => {
    if (password.trim().length >= 8 && password.trim().length < 12) {
        return true;
    }
    return false;
}

exports.emailExist = async (email) => {
    const users = await userDB.findOne({ email: email }, { _id: 0 });
    if (users) {
        return true;
    } else {
        return false;
    }
}


exports.validateUserID = async (userID) => {
    const users = await userDB.findOne({ userId: userID }, { _id: 0 });
    if (users) {
        return true;
    } else {
        return false;
    }
}