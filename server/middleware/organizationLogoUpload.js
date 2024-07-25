const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir_upload = "./uploads";
    if (!fs.existsSync(dir_upload)) {
      console.log(dir_upload);
      fs.mkdirSync(dir_upload, { recursive: true });
    }
    cb(null, dir_upload);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

module.exports = upload.single("organizationLogo");
