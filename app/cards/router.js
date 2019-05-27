const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

const router = require('express').Router();

const controller = require('./controller');

router.post('/upload', upload.single('image'), controller.uploadImage);

module.exports = router;
