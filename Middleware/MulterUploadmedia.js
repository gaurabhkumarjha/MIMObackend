const multer = require("multer");


const Mediaconfig = multer.diskStorage({ // Assignment storage path
    destination: (req, file, callback) => {
        callback(null, "./Upload")
    },
    filename: (req, file, callback) => {
        callback(null, `Media.${file.originalname}`)
    }
})

const isvalid = (req, file, callback) => {

    // const fileExtension = file.originalname.split('.').pop();

    const fileExtension = file.originalname.split('.').pop();
    const allowedExtensions = ['mp3', 'wav', 'ogg'];

    if (allowedExtensions.includes(fileExtension) && (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/ogg')) {
        callback(null, true);
    } else {
        callback(new Error("Only Audio file extension valid, (.mp3, .ogg, .wav)"));
    }
};
const Mediauploader = multer({
    storage: Mediaconfig,
    fileFilter: isvalid
});

module.exports = Mediauploader;