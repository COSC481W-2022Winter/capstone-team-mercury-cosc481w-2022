const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      //newly added for profile customization
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    avatarurl: {
      type: String,
    },
    avatarid: {
      type: String,
    },
    bannerid: {
      type: String,
    },
    bannerurl: {
      type: String,
    },
  },
  { id: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
