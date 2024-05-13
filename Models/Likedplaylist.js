const mongoose = require("mongoose");


const Likeplaylistschema = new mongoose.Schema({

    songname: {
        type: String,
        required: true,
    },
    Firebase_uid: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usercredentials',
        required: true
    },

});

const Likedplaylist = mongoose.model('Likedplaylist', Likeplaylistschema);
module.exports = Likedplaylist; 