const userDB = require('../model/userSchema');

exports.generateUserId = async () => {
    const data = await userDB.find({});
    var Id = null;
    var IdString = null;
    if(data.length>0){
        let IdArray = data[data.length-1].userId.split("-"); 
        Id = parseInt(IdArray[IdArray.length-1]) + 1;
        if(Id<10){
            IdString = "U-00"+ Id.toString();
        }else if(Id>=10 && Id<100){
            IdString = "U-0"+ Id.toString();
        }else{
            IdString = "U-"+ Id.toString();
        }
        
    }else{
        Id = 1;
        IdString = "U-00"+ Id.toString();
    }
    return IdString;
};