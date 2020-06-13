var db = require("../models");
// const { default: Axios } = require("axios");
var axios = require("axios");
var api_key = process.env.API_KEY;

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Streamline.findAll({}).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Streamline.create(req.body).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Streamline.destroy({ where: { id: req.params.id } }).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // UTelly config (needs to be inside another app.get with route of api/utelly)
  app.get("/api/utelly", function (req, res) {

    //var movie = req.

    axios({
      method: "get",
      url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + "Jaws" + "&country=us",
      headers: {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
      },
      async: true,
      crossDomain: true,
    }).then(function(response){
      console.log(response.data);
      res.json(response.data)
    });

  });
};

