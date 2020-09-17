const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const async =require('async');
const User = mongoose.model('User');
// const moneySent = require('../models/moneysent.model');
// const moneyReceived = mongoose.model('moneyReceived');

module.exports.register = (req, res, next) => {
    
        
            var user = new User();
            //random amount of money
            var amount = [ 10000,
                   20000,
                   30000,
                   40000,
                   50000,
                   60000,
                   70000,
                   80000,
                   90000,
                   100000
                        ];
             var money=   amount[ Math.floor(Math.random() * (10 - 1) + 1)];
             var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        
             //creditcard expiration date
             var year=date.slice(0,4);
             var newYear=parseInt(year) +3;
             var month=date.slice(5,7);
             var Expired = month+'/'+newYear;
        
              // creditcard number
             var firstfours=  Math.floor(Math.random() * (9999 - 1111) + 1111) ;
             var secondfours= Math.floor(Math.random() * (9999 - 1111) + 1111); 
             var thirdfours= Math.floor(Math.random() * (9999 - 1111) + 1111);
              var lastfours =Math.floor(Math.random() * (9999 - 1111) + 1111);
             var creditnumber=firstfours.toString() + secondfours.toString() + thirdfours.toString() + lastfours.toString();
             
             //creditcard signature
             var creditSignature=  Math.floor(Math.random() * (999999 - 111111) + 111111) ;
             //creditcardowner
             var owner=req.body.name.slice(0,1).toUpperCase() + " " + req.body.surname.toUpperCase();
            // pin 
            var pin=  Math.floor(Math.random() * (9999 - 1111) + 1111) ;
        
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.email = req.body.email;
            user.password = req.body.password;
            user.moneyInBank = money;
            user.Address = req.body.address;
            user.phoneNumber =req.body.phoneNumber;
            user.myIdOrPassortNumber = req.body.myIdOrPassortNumber;
            user.creditCard.creditcardNumber =creditnumber;
            user.creditCard.creditcardExpiration = Expired ;
            user.creditCard.creditcardSignature = creditSignature;
            user.creditCard.creditowner = 'MR/MRS/Miss ' + owner;
            user.creditCard.creditpin = pin;


            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: 'christianmambu243@gmail.com', // generated ethereal user
                  pass: '19977060', // generated ethereal password
                }
              });
            
              // send mail with defined transport object
              let info ={
                  to: req.body.email, // list of receivers
                  from: '"🏦 My Virtual Bank" christianmambu243@gmail.com', // sender address
                  subject: "Welcome!", // Subject line
                  text: "Welcome to my virtual bank "+ req.body.name + ", here are some of your account details \n\n",
                       // plain text body
                  html: "<h1> ☺️ Welcome to my virtual bank "+ req.body.name + "! </h1>"+
                  "<br>"+
                  "<h3>💳 Credit card details:</h3> "+
                  "<br>"+
                  "<h3>⚠️ Confidential</h3> "+
                  "<br>"+
                  "<h3>Credit card number: <strong>"  + firstfours +" "+ secondfours +" "+thirdfours+" "+lastfours+" " +  " </strong></h3> "  +
                  "<hr>"+
                  "<h3> Six digit signature: <strong>" +  creditSignature + "</strong></h3> " + // plain text body
                  "<hr>"+
                  "<h3>  The expiration date: <strong>" + Expired + "</strong></h3> "+   
                  "<hr>"+
                  "<h3>  Credit card pin:<strong> <i >" + pin + "</i></strong></h3> "+
                  "<br>"+
                  "👌🏾👌🏾👌🏾👌🏾"
                  // plain text body
                  
                  // html body
              };
              transporter.sendMail(info, function (err, messRes) {
                  if (err) {
                      res.send(messRes);
                     
                    }else{
                        
                        console.log('email sent');
                        
                 }
              });
            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email adrress found.']);
                    else
                        return next(err);
                }
        
            });
         
    
    
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : user });
        }
    );
}