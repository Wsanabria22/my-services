import multer from 'multer';
import path from 'path';

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '/public/images'),
  filename: (req, file, cb) => {cb(null, file.originalname)}
})


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else
    cb({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" }, false);
};


const fileUpload = multer({
  storage: diskStorage,
  fileFilter,
});

export default fileUpload;
