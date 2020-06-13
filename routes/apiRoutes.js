var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Streamline.findAll({}).then(function(dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Streamline.create(req.body).then(function(dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Streamline.destroy({ where: { id: req.params.id } }).then(function(dbStreamline) {
      res.json(dbStreamline);
    });
  });

  //post for new user
  app.post("/api/newuser", function(req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(data){
    res.redirect('/')
  });
  });
  //post for login
  app.post("/api/login", function(req, res) {
    db.User.findOne({ where: 
      {
        username: req.body.username.trim(),
        password: req.body.password.trim()
      }
    }).then(function(data) {
      console.log(data);
      res.redirect('/' + data.id);
    });
  });
};