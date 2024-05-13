const mongoose = require("mongoose");

const Playlistimgschema = new mongoose.Schema({

    Playlistname: {
        type: String,
        unique: true,
        required: true
    },
    Songname: {
        type: String,
        required: true
    },
    Tag: {
        type: String,
        required: true
    },
    playlistbannerimg: {
        type: String,
        required: true
    },
    Media_rec: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usercredentials',
        required: true
    },

})

const Playlistimg = mongoose.model('Playlistimg', Playlistimgschema);
module.exports = Playlistimg; 