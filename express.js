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
});

  

const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

