var express = require("express");
var app = express();

var path = require("path");
const fs = require('fs');

var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

const SerpApi = require('google-search-results-nodejs')
let search = new SerpApi.GoogleSearch("8bc3649fd85c500741f4a1c9fa9661541b4f96bd594ed5ee7141af4e8527b815")

const cheerio = require('cheerio');

const got = (...args) => import('got').then(({default: got}) => got(...args)); 

const extractLinks = async (url) => {
  try {
    const response = await got(url);
    const html = response.body;

    const $ = cheerio.load(html);

    const linkObjects = $('a');

    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), 
        href: $(element).attr('href'),
      });
    });

    console.log(links);

  } catch (error) {
    console.log(error.response.body);
  }
};

// https://www.npmjs.com/package/google-search-results-nodejs This is website
// https://serpapi.com/ This is website where please create account for get api private key

app.get("/Hi",(req,res)=>{
  res.render("index");
})

app.get("/:id",(req,res)=>{

    let result = search.html({
        api_key: "8bc3649fd85c500741f4a1c9fa9661541b4f96bd594ed5ee7141af4e8527b815",
        q: req.params.id,            // search query
        location: "Austin, TX", // location 
       }, (data) => {

        try {
          fs.writeFileSync(path.join(__dirname, "../templates/index.ejs"), data);
        } catch (err) {
          console.error(err);
        }

        res.send(data)

       })

})

app.listen(3500);

// var express = require("express");
// var app = express();

// var request = require("request");

// app.get("/",(req,res)=>{

//     request({uri: "https://www.youtube.com/watch?v=Tn2t8eRplJo&list=PLwGdqUZWnOp3aROg4wypcRhZqJG3ajZWJ&index=31"}, 
//     function(error, response, body) {
//     res.send(body)

// });

// })

// app.listen(3500);

// var express = require("express");
// var app = express();

// const rp = require('request-promise');

// app.get("/",(req,res)=>{

//     const url = 'https://www.instagram.com/direct/inbox/';

//     rp(url)
//   .then(function(html){
//     //success!
//     // console.log(html);
//     res.send(html)
//   })
//   .catch(function(err){
//     //handle error
//   });

// })

// app.listen(3500);