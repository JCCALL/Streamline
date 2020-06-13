var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Streamline.findAll({}).then(function(dbStreamline) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbStreamline
      });
    });
  });

  app.get("/login", function(req, res) {
    db.Streamline.findAll({}).then(function(dbStreamline) {
      res.render("login", {
        msg: "Welcome!",
        examples: dbStreamline
      });
    });
  });

  app.get("/home", function(req, res) {
    db.Streamline.findAll({}).then(function(dbStreamline) {
      res.render("home", {
        msg: "Welcome!",
        examples: dbStreamline
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Streamline.findOne({ where: { id: req.params.id } }).then(function(dbStreamline) {
      res.render("example", {
        example: dbStreamline
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
