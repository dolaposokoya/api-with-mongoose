const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const statusMessages = require('../config/appConstants')
const fs = require('fs')

// USING MULTER FOR INSERTING FILES IN USER TABLE
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/files");
    },
    filename: function (request, file, callback) {
        const fileUrl = uuidv4() + path.extname(file.originalname)
        callback(null, fileUrl);
    },
});

const upload = multer({ storage: storage }).single("file");

const fileUpload = (req, res) => {
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

const deleteFile = async (req, res) => {
    try {
        const imagePath = "public/files";
        const filePath = req.file;
        if (fs.existsSync(`${imagePath}/${filePath}`)) {
            fs.unlink(`${imagePath}/${filePath}`, (error) => {
                if (error) {
                    statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG.error = error
                    res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG);
                }
                else {
                    res.json(statusMessages.SUCCESS_MSG.DELETE)
                }
            });
        }
        else {
            res.json(statusMessages.SUCCESS_MSG.DELETE)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.error = error
        res.json(statusMessages.ERROR_MSG.IMP_ERROR);
    }
}


module.exports = {
    fileUpload,
    deleteFile
}