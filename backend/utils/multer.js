const multer = require("multer");
const path = require("path");
var maxSize = 2 * 1024 * 1024;
// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: maxSize,
  },
});
