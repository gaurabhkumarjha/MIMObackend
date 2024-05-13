const mongoose = require("mongoose");

const Mediaschema = new mongoose.Schema({

    mediarecord: {
        type: Array,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usercredentials',
        required: true
    },

})

const Media = mongoose.model('Media', Mediaschema);
module.exports = Media; 