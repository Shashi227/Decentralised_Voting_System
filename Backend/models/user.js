const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    phone : {
        type:String,
        required:true
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    password : {
        type:String,
        require:true
    },
    voterID : {
        type:String,
        }
})

const User = new mongoose.model("User",userSchema);

module.exports = User;