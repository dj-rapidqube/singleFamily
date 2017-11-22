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
        console.log("body",req.body);
        var email = req.body.email;
        console.log(email);
        var password = req.body.password;
        console.log(password)
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
        
        console.log(req.body);

        res.send({
            "message": "Profile is Builded",
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
    
    router.get("/mock/getAssets", (req, res) => {
        res.send({

            "assetDetails": [{
                "car": "Lamborghini",
                "car1": "ferrari",
                "car2": "duccati",
                "car3": "porsche",
                "car4": "bentley"
            },{
               "bike1":"Kawasaki ninja",
               "bike2":"buggati",
               "bike3":"Royal Enfield" 
            } ],

            "BankDetails": [{

                    "bankname":"Swiss Bank",
                    "balance": "54574633541 CHF ",
                    "branch": "switzerland",
                }, {
                    "bankname": "SBI",
                    "balance": " 46874981015 ₹ ",
                    "branch": "India",
                },
                {
                    "bankname": "world Bank",
                    "balance": "4854798715 $",
                    "branch": "America"
                }
            ],
            "Companies_Owned": [{
                    "companyname":"Infosys",
                    "location":"Chennai",
                    "Income": "548914695498 ₹crore"
                },
                {
                    "companyname":"Hexaware",
                    "location":"Chennai",
                    "Income":"89796541657 ₹ crore"
                },
                {
                    "companyname":"Rapidqube",
                    "location":"Chennai",
                    "Income":"45455487401 ₹ crore"
                },
                {
                    "companyname":"Rapidqube",
                    "location":"Mumbai",
                    "Income":"65495729765426 ₹ crore"
                }
            ],
                "mutualFund": [{
                "fundno":"11158584",
                "companyname":"HSBC Mutual Funds",
                "distributions": "5489 ₹",
                "investmentcategory": "Debt - Ultra short-term funds",
                "Type"	: "Open ended",
                "Date":"20/2/2018"
            },
            {
                "fundno":"4546465",
                "companyname":"Bharati AXA MF",
                "distributions": "25549 ₹",
                "investmentcategory": "Debt - Ultra short-term funds",
                "Type"	: 	"Open ended",
                "Date":"20/2/2018"
                
            },
            {
                "fundno":"5465468",
                "companyname":"BNP Paribas Mutual Funds",
                "distributions": "41549 ₹",
                "investmentcategory": "Debt - Ultra short-term funds",
                "Type"	: 	"Open ended",
                "Date":"20/2/2018"
                
            },
            {
                "fundno":"656546",                
                "companyname":"IIFL Mutual Funds",
                "distributions": "41549 ₹",
                "investmentcategory": "Debt - Ultra short-term funds",
                "Type"	: "Open ended",
                "Date":"20/2/2018"
                
            }
        ],
            
        })
    })


}