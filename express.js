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
  // fetch("https://dog.ceo/api/breeds/image/random")
  // .then(res => res.json())
  // .then(
  //   (json) => {
  //     console.log(json)
  //     res.render('firstAPI', { 
  //       image: json
        
  //     })
  //   })
    // let [...breed] = json.message
  fetch(`https://dog.ceo/api/breeds/list/all`)
  
  .then(res => res.json())
  .then(
    (json) => {
      var keys = Object.keys(json.message);
    console.log(keys);
    res.render("firstAPI", {
      breed: keys
    })
    console.log(keys.length)
    })
});

app.get('/breeds/:id', async (req, res) => {
  try {
      const URI = `https://dog.ceo/api/breed/${req.params.id}/images`;
      const dogData = await fetch(URI);
      const json = await dogData.json();
      
      totalImg = json.message.length;
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      trueRandom = getRandomInt(totalImg);
      trueRandom2 = getRandomInt(totalImg);
      trueRandom3 =  getRandomInt(totalImg);
      trueRandom4 = getRandomInt(totalImg);
      trueRandom5 = getRandomInt(totalImg);
      trueRandom6 = getRandomInt(totalImg);

      console.log(json);
    // console.log(trueRandom);
      // console.log(json.message[trueRandom]);

      await res.render('breeds', {
          name: req.params.id,
          imgs: [
            json.message[trueRandom],
            json.message[trueRandom2],
            json.message[trueRandom3],
            json.message[trueRandom4],
            json.message[trueRandom5],
            json.message[trueRandom6]
          ]
          // json.message[trueRandom]
      });

  } catch (error) {
      console.log(error);
  }
       
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

