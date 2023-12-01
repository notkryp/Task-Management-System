const mongoose = require('mongoose');

const newNotification = mongoose.Schema(
    {
        notificationTitle:{
            type:String,
            required:true,
        },
        notificationBody:{
            type:String,
            required:true,
        }
    }, {collection:"Notification"}
);

const addNotificaiton = mongoose.model("Notifcations", newNotification);

module.exports = addNotificaiton;