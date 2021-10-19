const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        requires : true,
        min : 3,
        max: 20,
        unique : true
    },
    email : {
        type : String,
        requires : true,
        max : 50,
        inique : true
    },
    password : {
        type : String,
        required : true,
        min : 6,
    },
    profilePicture : {
        type : String,
        default : ""
    },
    convertPicture : {
        type : String,
        default : ""
    },
    followers : {
        type : Array,
        default : []
    },
    followings : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    desc : {
        type : String,
        max : 50,
    },
    city : {
        type :String,
        max : 50
    },
    from : {
        type :String,
        max : 50
    },
    relationships : {
        type : Number,
        enum : [1,2,3]
    }
} , { timestamps: true });

module.exports = mongoose.model("User" , UserSchema)