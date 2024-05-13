const mongoose = require("mongoose");


const Userschema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
    },
    emailaddress: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    AccType: {
        type: String,
    },
    profileImg: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    isverified: {
        type: Boolean,
        required: true,
    },
    Phonenumber: {
        type: String,
        default: "NULL"

    },
    others: { // Rest of user details stored in this field
        type: Array,
        required: true
    }
});

const Usercredentials = mongoose.model('Usercredentials', Userschema);
module.exports = Usercredentials; 