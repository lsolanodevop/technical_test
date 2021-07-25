"use strict";
const express = require("express");
const url = require("url");
const queryString = require("querystring");
const postman = require("postman-request");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/user/:user", (req, res, callback) => {
    const user = req.params.user;
    const url = "https://torre.bio/api/bios/" + encodeURIComponent(user);
    let personalObj = {};
    postman({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to send the request", undefined);
        }
        else if (response.body.code === "011002" && response.body.message === "Person not found!") {
            const noData = {
                code: response.body.code,
                message: response.body.message
            };
            callback(noData.code + " " + noData.message, undefined);
        }
        else {
            personalObj = {
                professionalHeadline: response.body.person.professionalHeadline,
                picture: response.body.person.picture,
                name: response.body.person.name,
                links: response.body.person.links,
                location: response.body.person.location,
                summary: response.body.person.summaryOfBio,
                stats: response.body.stats,
                habilities: response.body.strengths,
                interest: response.body.interests,
                experiences: response.body.experiences
            };
            // console.log("This is a " +JSON.stringify(personalObj));
            res.contentType("application/json");
            res.end(JSON.stringify(personalObj));
        }
        // return personalObj;
    });
});
app.listen(4000, () => {
    console.log("Ready to rock");
});
