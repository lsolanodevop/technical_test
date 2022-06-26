const express = require("express");
const url = require("url");
const queryString = require("querystring");
const postman = require("postman-request");
const pdf = require("pdf-creator-node");
const fs = require("fs"); 
const app = express();

app.use(function (req:any, res:any, next:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/user/:user", (req:any, res:any, callback:any) => {
  const user = req.params.user;
  const url = "https://torre.bio/api/bios/" + encodeURIComponent(user);
  let personalObj = {};
  
  postman({ url: url, json: true }, (error:any, response:any) => {
    if (error) {
      callback("Unable to send the request",undefined);
    } else if (response.body.code ==="011002" && response.body.message === "Person not found!") {
      const noData = {
        code: response.body.code,
        message: response.body.message
      }
    callback(noData.code + " " + noData.message,undefined);
    } else {
      personalObj = {
        professionalHeadline: response.body.person.professionalHeadline,
        picture: response.body.person.picture,
        name: response.body.person.name,
        links: response.body.person.links,
        location: response.body.person.location,
        summary: response.body.person.summaryOfBio,
        experiences: response.body.experiences
  
      }
      // console.log("This is a " +JSON.stringify(personalObj));
      res.contentType("application/json");
      res.end(JSON.stringify(personalObj));
    }
    // return personalObj;
  });
});

app.get("/job/:jobid", (req:any, res:any, callback:any) => {
  const job = req.params.jobid;
  const url = "https://torre.co/api/opportunities/" + encodeURIComponent(job);
  // console.log(url);
  let jobObj = {};
  postman({ url: url, json: true }, (error:any, response:any) => {
    if (error) {
      callback("Unable to send the request",undefined);
    // // } else if (response.body.code ==="011002" && response.body.message === "Person not found!") {
    // //   const noData = {
    // //     code: response.body.code,
    // //     message: response.body.message
    // //   }
    // // callback(noData.code + " " + noData.message,undefined);
    } else {
      //  console.log(response.body);
      jobObj = {
        attachments: response.body.attachments,
        objective: response.body.objective,
        members: response.body.members,
        owner: response.body.owner,
        compensation: response.body.compensation,
        status: response.body.status,
        details: response.body.details
  
      }
      // console.log("This is a " +JSON.stringify(personalObj));
      res.contentType("application/json");
      res.end(JSON.stringify(jobObj));
    }
    // return personalObj;
  });
});

app.post("/advanced/:search", async(request:any, response:any) => {
  const size = request.query.size;
  const offset = request.query.offset;
  const requestedBody = JSON.stringify(request.body);
  console.log(requestedBody);
  let res;
  res = await postman(`https://search.torre.co/people/_search/size=20&offset=1`, {
        method: 'POST',
        body: requestedBody,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      });
  const data = await res.json();
  // console.log(data);
})



app.listen(4000, () => {
  console.log("Ready to rock");
});