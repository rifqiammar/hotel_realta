const multer = require("multer");

const diskStorage = multer.diskStorage;

// Multer File Filter
const allowedFileExtension = ["jpg", "png", "JPG", "PNG", "JPEG", "jpeg"];
const fileFilterOption = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();

  if (!allowedFileExtension.includes(ext)) {
    req.errorValidateFile = "Hanya Boleh Image";
    return cb(null, false);
  }

  cb(null, true);
};

// Menentukan dimana menyimpan File yang akan di upload
const storageStockPhoto = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/purchase");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    cb(null, `${timestamp}-${fileName}`);
  },
});

const stockPhoto = multer({
  storage: storageStockPhoto,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2MB
  },
  fileFilter: fileFilterOption,
});

module.exports = { stockPhoto };
