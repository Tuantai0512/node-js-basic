import express from "express";
import homeController from '../controler/homeControler'
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/uploads', homeController.getUploadFile);
    router.get('/detail/users/:userID', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/remove-user', homeController.deleteUser);
    router.get('/edit-user/:userID', homeController.editUser);
    router.post('/update-user/:userID', homeController.updateUser);
    router.get('/upload', homeController.getUploadFile);
    router.post('/upload-profile-pic', upload.single('profile_pic') ,homeController.handleUploadFile)
    router.get('/about', (req, res) => {
        res.send(`I'm Hậu tạ vcl`)
    })

    return app.use('/', router)
}

export default initWebRoute;