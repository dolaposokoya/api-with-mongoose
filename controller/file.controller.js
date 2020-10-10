const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const statusMessages = require('../config/appConstants')

// USING MULTER FOR INSERTING FILES IN USER TABLE
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/images");
    },
    filename: function (request, file, callback) {
        const fileUrl = uuidv4() + path.extname(file.originalname)
        callback(null, fileUrl);
    },
});

const upload = multer({ storage: storage }).single("profile_image");

const imageUpload = (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError)
                res.json({ message: "Unable to upload image" });
            else if (err)
                res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
            else {
                files = req.files
                const profile_image = {
                    fileType: req.file.mimetype,
                    fileUrl: req.file.path,
                    fileName: req.file.filename,
                };
                statusMessages.SUCCESS_MSG.SUCCESS.data = profile_image
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            }
        });
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

module.exports = {
    imageUpload
}