const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    fromUser: {type: String},
    toUser: {type: String},
    notifType: {type: String},
    context: {type: String},
    time:{ type: Date, default: Date.now },
}, {id: true});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;