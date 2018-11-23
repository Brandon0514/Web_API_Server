const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();
const Data = require('./models/Item');
// const Detail = require('./models/Detail');

var Users = require('./routes/api/Users');

//Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/items', items);

//Api Key
const apikey = '10255e7670c6cf88d80320c2ddf5f034';

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(Users);

/*----------- Api Get -------------*/

app.get('/getTrendingTVshows/:page', (req, res) => {
  const URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apikey}&page=${
    req.params.page
  }`;
  axios
    .get(URL)
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {});
});

//Search
app.get('/getSearch', (req, res) => {
  let title = req.query.title;
  let url = `https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${title}`;

  console.log(url);

  axios
    .get(url)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.send('Not Found');
      res.status(404).json(error);
    });
});

var Name = null;
var URL2 = 'http://api.tvmaze.com/search/shows?q=' + Name;

app.post('/getOfficialSite', (req, res) => {
  Name = req.body.name;
  console.log(Name);
  URL2 = 'http://api.tvmaze.com/search/shows?q=' + Name;
});

app.get(`/getOfficialSite/Name`, (req, res) => {
  axios
    .get(URL2)
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

/*----------- MongoDB Data Get -------------*/

//Get MongoDB Data (Tv Series)
app.get('/getFavorite', (req, res) => {
  Data.find()
    .then(data => {
      res.send(data);
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.post('/getFavorite/Add', (req, res) => {
    console.log('UserId - ', req.body.email);

  const data = [
    {
      Tv_Series_Name: req.body.Tv_Series_Name,
      Rating: req.body.Rating,
      Overview: req.body.Overview,
      TV_Series_Poster: req.body.TV_Series_Poster,
      id: req.body.id,
      Web_Site: req.body.Web_Site,
      email: req.body.email
    }
  ];
  Data.insertMany(data)
    .then(result => {
      res.send(result);
      res.status(200).json(result);
      console.log('Here');
    })
    .catch(error => {
      res.status(400).json(error);
      console.log('Not Here');
    });
});

app.post('/getFavorite/Delete', (req, res) => {
  const query = {
    Tv_Series_Name: req.body.Tv_Series_Name
  };
  Data.deleteOne(query)
    .then(result => {
      res.send(result);
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
