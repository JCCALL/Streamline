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
};
