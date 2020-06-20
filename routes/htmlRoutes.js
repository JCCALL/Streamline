var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("login", {
      layout: 'main'
    });
  });
  app.get("/newuser", function(req, res) {
    res.render("newuser", {
      layout: 'main'
    });
  });
  
  app.get("/logout", function(req, res) {
    res.render("logout", {
      layout: 'main'
    });
  });

  app.get("/:id", function(req, res) {
      db.Users.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        db.Streamline.findAll({
          where: {
            UserId: req.params.id
          }
        }).then(function(data) {
          console.log(data);
          var examples = {
              movies: data,
          }
          res.render("index", examples);

        })
      
      })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
