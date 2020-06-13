var db = require("../models");
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
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
      }
    }
    //UTelly Call
    $.ajax(settings).done(function (response) {
      var res = response.results;
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        $("#movie-view").append('<div class="movie-data pt-5"><h3>' +
          res[i].name + '</h3><br>' +
          '<img class="movie-pic img-fluid" src=' + res[i].picture + '><br></div>');
        for (var j = 0; j < res[i].locations.length; j++) {
          if (res[i].locations[j].icon) {
            $("#movie-view").append(
              '<div class="streaming-list"><a target="_blank" href=' + res[i].locations[j].url +
              '><img class="streaming-icons img-fluid" src=' + res[i].locations[j].icon + '></a></div>'
            );
          }
        }
      }

    });
  });
  };

