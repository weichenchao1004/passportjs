var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../model/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('getting user details ... ');
    res.render('index');
});


router.get('/index',function(req,res) {
    if(req.user){
        res.status(200).json({user:req.user});
    }else{
        res.status(500).json('not login in ');
    }
})



router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res) {
    console.log(req.body);
    Account.register(new Account(req.body), req.body.password, function(err, result) {
        if (err) { console.log('error while user register!', err);
            console.log('could not add user');
            res.status(500).json({ message: 'could not add user!' });
        } else {
            console.log('added person');

            passport.authenticate('local')(req, res, function () {
                res.status(201).json({message: 'Welcome Register', user: req.user});
            });


        }
    });
});

router.get('/login', function(req, res) {
    console.log(req.user);
    if(req.user) {

        res.send('you are already login in!');
    } else {
        res.render('login', {});
    }
});

router.post('/login', passport.authenticate('local'), function(req, res) {

    if (req.user) {
        res.status(200).json('User has login in!');

    } else {
        // json that user is not authenticated
        res.status(500).json('User is NOT authenticated');
    }

});

module.exports = router;