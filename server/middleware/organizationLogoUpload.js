const multer = require("multer");
const path = require("path");
const fs = require("fs");
// set a storage engine
const storage = multer.diskStorage({
  //   destination
  destination: (req, file, cb) => {
    const dir_upload = "../uploads";
    if (!fs.existsSync(dir_upload)) {
      fs.mkdirSync(dir_upload);
    }
    cb(null, dir_upload);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// initialize multer
const upload = multer({
  storage: storage,
  // file limit or size
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
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
