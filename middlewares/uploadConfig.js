
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'public/uploads/imageProducts')); // Define a pasta de destino
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Apenas imagens nos formatos JPEG, JPG e PNG são permitidas.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
