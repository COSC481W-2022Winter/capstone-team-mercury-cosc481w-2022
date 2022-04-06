const cloudinary = require("cloudinary").v2;
// Here you need to update the info
cloudinary.config({
  cloud_name: "cutestpaw",
  api_key: "439311978737872",
  api_secret: "xL0gxBxjftV6KaRabeXUtU4nsxA",
});

module.exports = cloudinary;
