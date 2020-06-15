// Get references to page elements

var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var utellyResults = [];
var omdbResults = [];
var imdbIDArray = [];

// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function (example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/examples",
            data: JSON.stringify(example)
        });
    },
    saveSearch: function (search) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/search",
            data: JSON.stringify(search)
        });
    },
    getExamples: function () {
        return $.ajax({
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function (id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    },
    getMovie: function (movie) {
        return $.ajax({
            url: "api/utelly",
            type: "GET"
        })
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
    API.getExamples().then(function (data) {
        var $examples = data.map(function (example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();

    var example = {
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
        alert("You must enter an example text and description!");
        return;
    }

    API.saveExample(example).then(function () {
        refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
        refreshExamples();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// Find movie
$("#find-movie").on("click", function (event) {
    event.preventDefault();
    $(".tabcontent").hide();
    $("#movie-view").empty();
    omdbResults = [];
    utellyResults = [];

    // Here we grab the text from the input box
    var movie = $("#movie-input").val();

    // OMDB
    var queryURL = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy";

    // OMDB Call - saves to results array
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        omdbResults.push(response);
        var omdb = omdbResults[0].Search
        console.log(omdb);
        for (i = 0; i < omdb.length; i++) {
            // console.log(omdb[i].Poster + omdb[i].Title + omdb[i].Year);
            console.log(omdb[i].imdbID);
            imdbIDArray.push(omdb[i].imdbID);
        }
    });

    var search = {
        search: movie
    };

    API.saveSearch(search).then(function () {
        API.getMovie(movie).then(function (response) {
            utellyResults.push(response);
            console.log(utellyResults);
            var utelly = utellyResults[0].results;
            for (var i = 0; i < utelly.length; i++) {
                var imdbID = utelly[i].external_ids.imdb.id;
                console.log("IMDB ID #" + [i] + ": " + imdbID);
                var movieDiv = $('<div class="movie-list">');
                var bgOverlay = $('<div class="bg-overlay">');
                $(movieDiv).attr('id', imdbID);
                $(movieDiv).attr('value', [i]);
                $(movieDiv).css('background-image', 'url(' + utelly[i].picture + ')');
                var movieName = '<h3 class="movie-title">' + utelly[i].name + '</h3>';
                var moviePicture = '<img class="movie-pic img-fluid" src=' + utelly[i].picture + '>';
                var imdbLink = '<a target="_blank" href=' + utelly[i].external_ids.imdb.url + '><img class="location-icon img-fluid" src="https://img.icons8.com/all/500/imdb.png"></a>';
                var watchButton = '<button id="' + [i] + '" value="' + imdbID + '" class="btn btn-primary watch-button">Add to Watchlist</button>';
                var locationList = $('<div class="location-list">');
                var streamingIcons = $('<div class="streaming-list col-6">Stream</div>');
                var locationIcons = $('<div class="rent-or-buy-list col-6">Rent | Buy</div>');
                for (var j = 0; j < utelly[i].locations.length; j++) {
                    var provider = utelly[i].locations[j].display_name;
                    if (provider === 'Netflix' || provider === 'Amazon Prime Video' || provider === 'Disney+' || provider === 'HBO' || provider === 'Hulu') {
                        console.log("streaming");
                        $(streamingIcons).append('<a target="_blank" class="streaming-link" href=' +
                            utelly[i].locations[j].url + '><img class="location-icon img-fluid" src=' +
                            utelly[i].locations[j].icon + '></a>');
                    } else if (provider === 'AtomTicketsIVAUS') {
                        console.log("No icon for AtomTickets");
                    } else {
                        console.log("Rent/buy list");
                        $(locationIcons).append('<a target="_blank" class="rent-or-buy-link" href=' +
                            utelly[i].locations[j].url + '><img class="location-icon img-fluid" src=' +
                            utelly[i].locations[j].icon + '></a>');
                    }
                    $(locationList).append(streamingIcons, locationIcons);
                }
                $(movieDiv).append(bgOverlay, movieName, imdbLink, watchButton, locationList);
                $("#movie-view").append(movieDiv);
            }
        });
    });
});



// Tabs function
function openTabs(evt, showName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(showName).style.display = "block";
    evt.currentTarget.className += " active";
}

function showPassword() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}