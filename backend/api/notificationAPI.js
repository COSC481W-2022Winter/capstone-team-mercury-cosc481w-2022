var express = require("express");
const app = express();

var router = express.Router();
var bodyParser = require("body-parser");

const User = require('../models/user');
const Notif = require("../models/notification");

router.use(bodyParser.urlencoded({ extended: true }));


router.post("/getNotifs", function (req, res) {
  const user = req.body.username;

  Notif.find({ toUser: user }).sort({"$natural":-1}).limit(25).then((notifs) => {
    res.send(notifs);
  });
});

router.post("/getUpdateNotifCheckedTime", function (req, res) {
    const user = req.body.username;
    let date = new Date();

    User.findOneAndUpdate({username: user}, {notifCheckedTime: date.toISOString()}).then((user) => {
        res.send(user.notifCheckedTime);
      });

  });

module.exports = router;
