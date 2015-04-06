/**
 * Created by chenchaowei on 3/26/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
    //bcrypt = require('bcrypt-nodejs');


var User = new Schema({

});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);