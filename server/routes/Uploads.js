const express = require('express');
var passport = require("passport");
const {uploading,upload,getImages,getImage} =require('../controllers/uploadController');

const router = express.Router();

router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'),uploading);
router.get('/', passport.authenticate('jwt', { session: false }), getImages);
router.get('/:imgId', passport.authenticate('jwt', { session: false }), getImage);

module.exports = router;