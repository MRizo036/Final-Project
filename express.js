const express = require('express');
const path = require('path');
const port = 8082;
const fetch = require('node-fetch');
const app = express();
 
app.use("/static", express.static(path.join(__dirname, "public")));

app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


/*
* Each page requires its own get route
* express-faster snippets & express DOCS API are your HOMEWORK
* 
*/

/**
 * Explain the difference between res.send('') and res.render('',{})
 */

app.get('/', (req, res) => { 
  res.render("index")
});

app.get('/firstAPI', (req, res) => {
  fetch("https://dog.ceo/api/breeds/image/random")
  .then(res => res.json())
  .then(
    (json) => {
      console.log(json)
      res.render('firstAPI', { 
        image: json
      })
    })
    let breed = "african"
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
  
  .then(res => res.json())
  .then(
    (json) => {
    console.log(json)
    })
});

app.get('/secondAPI', (req, res) => {
  fetch("https://api.thecatapi.com/v1/images/search")
  .then(res => res.json())
  .then(
    (json) => {
      console.log(json[0].url)
      res.render('secondAPI', { 
        catImage: json[0].url
      })
    })
});

app.get('/thirdAPI', (req, res) => {
  fetch("https://randomfox.ca/floof/")
  .then(res => res.json())
  .then(
    (json) => {
      console.log(json)
      res.render('thirdAPI', { 
        foxImage: json
      })
    })
});

  

const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

