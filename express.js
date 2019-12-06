const express = require('express');
const path = require('path');
const port = 8080;
const fetch = require('node-fetch');
const app = express();
 
app.use("/static", express.static(path.join(__dirname, "public")));

app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

  app.get('/', (req, res) => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(
      (json) => {
        console.log(json)
        res.render('index', { 
          image: json
        })
      })
  });



  // app.get('/', (req, res) => {
  //   fetch("https://dog.ceo/api/breeds/list/all")
  //   .then(res => res.json())
  //   .then(
  //     (json) => {
  //       console.log(json)
  //       res.render('index', { 
  //         breeds: json
  //       })
  //     })
  // });


const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

