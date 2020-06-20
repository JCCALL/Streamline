var db = require("../models");
var axios = require("axios");
var bcrypt = require("bcrypt");
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

    app.get("/api/users", function (req, res) {
        db.Users.findAll({}).then(function (dbStreamline) {
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
    app.put("/api/examples/:id", function (req, res) {
        db.Streamline.update({
            watched: req.body.watched
        }, {
            where: { id: req.params.id },
        })
            .then(function (dbStreamline) {
                res.json(dbStreamline);
            })
    });

    // Mark as favorite
    app.put("/api/loved/:id", function (req, res) {
        db.Streamline.update({
            loved: req.body.loved
        }, {
            where: { id: req.params.id },
        })
            .then(function (dbStreamline) {
                res.json(dbStreamline);
            })
    });

    //post for new user
    app.post("/api/newuser", function (req, res) {
        db.Users.create({
            username: req.body.username.trim(),
            email: req.body.email.trim(),
            password: req.body.password.trim()
        }).then(function (data) {
            res.redirect('/' + data.id);
        });
    });

    // login
    app.post('/api/login', (req, res) => {
        var password = req.body.password;
        db.Users.findOne({
            where:
            {
                username: req.body.username
            }
        })
            .then(user => {
                //if user does not exist
                if (!user) return res.status(400).json({ msg: "User does not exist" })
                //if user exists, compare hashed password
                //password comes from the user
                //user.password comes from the database
                bcrypt.compare(password, user.password, (err, data) => {
                    if (err) throw err
                    //if both match
                    if (data) {
                        return res.redirect('/' + user.id);
                    } else {
                        return res.status(401).json({ msg: "Incorrect Password" })
                    }
                })
            })
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
        axios({
            method: "get",
            url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
            headers: {
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key": api_key
            },
            async: true,
            crossDomain: true,
        }).then(function (response) {
            res.json(response.data);
        });
    });

// UTelly search by IMDB Id
app.get("/api/utellyID", function (req, res) {
    axios({
        method: "get",
        url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=US&source_id=" + movie + "&source=imdb",
        headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": api_key
        },
        async: true,
        crossDomain: true,
    }).then(function (response) {
        res.json(response.data);
    });
});
}
