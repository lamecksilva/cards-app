const multer = require('multer');

const upload = multer({ dest: 'images/' });
const router = require('express').Router();

const controller = require('./controller');

router.post('/upload', upload.single('image'), controller.uploadImage);

module.exports = router;
