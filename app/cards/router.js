const multer = require('multer');
const path = require('path');

const upload = multer();
const router = require('express').Router();

const controller = require('./controller');

// storage: multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'images/');
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// }),
// fileFilter: (req, file, cb) => {
//   const type = file.mimetype.split('/')[1];
//   if (type === 'jpeg' || type === 'jpg' || type === 'png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// },

router.post('/register', upload.single('image'), controller.registerCard);

router.get('/', controller.getCards);

router.patch('/update/:id', controller.editCard);

router.put('/update-image/:id', upload.single('image'), controller.updateImage);

module.exports = router;