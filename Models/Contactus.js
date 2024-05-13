const mongoose = require("mongoose");

const contactschema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reply: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usercredentials',
        required: true
    },

})

const Contactus = mongoose.model('Contactus', contactschema);
module.exports = Contactus; 