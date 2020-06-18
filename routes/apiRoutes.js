var db = require("../models");
var axios = require("axios");
var api_key = process.env.API_KEY;


module.exports = function (app) {
  // Get watchlist
  app.get("/api/examples", function (req, res) {
    db.Streamline.findAll({}).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Add to watchlist
  app.post("/api/examples", function (req, res) {
    db.Streamline.create(req.body).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Delete a movie by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Streamline.destroy({ where: { id: req.params.id } }).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Mark as watched
  app.put("/api/examples/:id", function(req, res) {
    db.Streamline.update({ 
        watched: req.body.watched
      }, {
        where: {id: req.params.id},
      })
      .then(function(dbStreamline){
        res.json(dbStreamline);
    })
  });

  //post for new user
  app.post("/api/newuser", function(req, res) {
    db.Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(data){
    res.redirect('/' + data.id);
  });
  });
  //post for login
  app.post("/api/login", function(req, res) {
    db.Users.findOne({ where: 
      {
        username: req.body.username.trim(),
        password: req.body.password.trim()
      }
    }).then(function(data) {
      res.redirect('/' + data.id);
  });
  });
  
  // put to move watchlist to watched
  app.put("/api/watched", function(req, res) {
    db.Streamline.update({
      watched: true,
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data)
    });
  });

  
  // post to save search data
 app.post("/api/search", function (req, res) {
    movie = req.body.search;
    db.Search.create(req.body).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // UTelly config (needs to be inside another app.get with route of api/utelly)

  app.get("/api/utelly", function (req, res) {

//   var movie = 
    axios({
      method: "get",
      url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
      headers: {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
      },
      async: true,
      crossDomain: true,
    }).then(function(response){
      res.json(response.data);

    //   app.post("/api/newmovie", function(req, res) {
    //     db.users.create({
    //       username: req.body.username,
    //       email: req.body.email,
    //       password: req.body.password
    //     }).then(function(data){
    //     res.redirect('/')
    //   });
    //   });
    });
  });
  }
