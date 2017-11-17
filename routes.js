//here only routing is done
'use strict';
// const newRequest = require('./functions/newRequest');
// const updateRequest = require('./functions/updateRequest');
// const readRequest = require('./functions/readRequest');
// const readIndex = require('./functions/readIndex');
const cors = require('cors');
const nodemailer = require('nodemailer');
var request = require('request');
var mongoose = require('mongoose');
// var image = require('./models/documents');
// var dateTime = require('node-datetime');
var path = require('path');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var crypto = require('crypto');
var express = require('express');
// var cfenv = require('cfenv');

module.exports = router => {
    // file upload API
    cloudinary.config({
        cloud_name: 'rapidqubedigi',
        api_key: '247664843254646',
        api_secret: 'NNP88tw2YEBofSww9bPK7AV9Jc0'

    });

    // weather API key
    var apiKey = '6ebeec1ed5f648e88de55743172109';

    // Iot Data Thingworks 
    router.get('/Trading', cors(), (req, res1) => {
        console.log("entering into IOT function ");

        var options = {
            url: 'http://api.bitcoincharts.com/v1/markets.json',
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'Accept': 'application/json'
            },

        };
        request(options, function(err, result, body) {
            if (result && (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 401 || result.statusCode === 402 || result.statusCode === 404)) {
                var mydata = JSON.parse(result.body)

                res1.status(result.statusCode).json({

                    data: mydata,

                })
            }

        });

    });
    router.get('/stocks', cors(), (req, res1) => {
        console.log("entering into stocks function ");

        var options = {
            url: 'https://www.quandl.com/api/v3/datasets/NSE/HEXAWARE.json?api_key=EGT68rVF17ytsV284s5k&start_date=2011-06-29',
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'Accept': 'application/json'
            },

        };
        request(options, function(err, result, body) {
            if (result && (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 401 || result.statusCode === 402 || result.statusCode === 404)) {
                var mydata = JSON.parse(result.body)

                res1.status(result.statusCode).json({

                    data: mydata,

                })
            }

        });

    });
    // -----------------------------Mock Services For UI Testing-----------------------------------------

    router.post("/mock/Login", (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        console.log(JSON.stringify(req.body))
        console.log(email);
        if (email === "admin@sfo.com") {
            res.send({
                "message": "Login Successful",
                "userType": "Admin"
            })
        } else if (email == "user@sfo.com") {
            res.send({
                "message": "Login Successful",
                "userType": "User"
            })
        }
    })

    router.post("/mock/buildProfile", (req, res) => {
        ``
        console.log(req.body);

        res.send({
            "message": "Profile is Builded",
            "status": true,
            "details": req.body
        })
    })

    router.post("/mock/addAssets", (req, res) => {
        
        console.log(req.body);

        res.send({
            "message": "Congratulation your Assets has been added",
            "status": true,
            "details": req.body
        })
    })

    router.post("/mock/pledgeFund", (req, res) => {
        
        console.log(req.body);

        res.send({
            "message": "Congratulation your pledge proposal has been added",
            "status": true,
            "details": req.body
        })
    })

    router.post("/mock/addPortfolio", (req, res) => {
        
        console.log(req.body);

        res.send({
            "message": "Congratulation your portfolio has been added",
            "status": true,
            "details": req.body
        })
    })
    
    router.post("/mock/getAssets", (req, res) => {
        res.send({

            "assetDetails": [{
                "car": "Lamborghini",
                "car": "ferrari",
                "car": "duccati",
                "car": "porsche",
                "car": "bentley"
            },{
               "bike":"Kawasaki ninja",
               "bike":"buggati",
               "bike":"Royal Enfield" 
            } ],

            "BankDetails": [{

                    "bank name": "Swiss Bank",
                    "balance": " 54574633541 CHF ",
                    "branch": "switzerland",
                }, {
                    "bank Account": "SBI",
                    "balance": " 46874981015 ₹ ",
                    "branch": "India",
                },
                {
                    "bank Account": "world Bank",
                    "balance": "4854798715 $",
                    "branch": "America"
                }
            ],
            "Companies Owned": [{
                    "company name": "Infosys",
                    "location": "Chennai",
                    "Income": "548914695498 ₹ crore"
                },
                {
                    "company name": "Hexaware",
                    "location": "Chennai",
                    "Income": "89796541657 ₹ crore"
                },
                {
                    "company name": "Rapidqube",
                    "location": "Chennai",
                    "Income": "45455487401 ₹ crore"
                },
                {
                    "company name": "Rapidqube",
                    "location": "Mumbai",
                    "Income": "65495729765426 ₹ crore"
                }
            ],
            
        })
    })


}