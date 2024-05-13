const multer = require("multer");


const Playlistuploaderconfig = multer.diskStorage({ // Assignment storage path
    destination: (req, file, callback) => {
        callback(null, "./Upload")
    },
    filename: (req, file, callback) => {
        callback(null, `Playlist_image.${file.originalname}`)
    }
})

const isvalid = (req, file, callback) => {

    const fileExtension = file.originalname.split('.').pop();

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        callback(null, true);
    } else {
        callback(new Error("Only Image file extension valid, (.png, .jpg, .jpeg)"));
    }
};
const Playlistimageuploader = multer({
    storage: Playlistuploaderconfig,
    fileFilter: isvalid
});

module.exports = Playlistimageuploader;