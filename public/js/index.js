// Get references to page elements

var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var utellyResults = [];
var omdbResults = [];

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
        console.log(omdbResults[0].Search);
    });

    var search = {
        search: movie
    };

    API.saveSearch(search).then(function () {
        API.getMovie(movie).then(function (response) {
            var res = response.results;
            utellyResults.push(response);
            console.log(res);
            console.log(utellyResults);
            for (var i = 0; i < 10; i++) {
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


    // API.saveSearch(search).then(function () {
    //     API.getMovie(movie).then(function (res) {
    //         utellyResults.push(res.results);
    //         console.log(utellyResults);
    //         for (var i = 0; i < utellyResults.length; i++) {
    //             $("#movie-view").append('<div class="movie-data pt-5"><h3>' +
    //                 utellyResults[i].name + '</h3><br>' +
    //                 '<img class="movie-pic img-fluid" src=' + utellyResults[i].picture + '><br></div>');
    //             for (var j = 0; j < utellyResults[i].locations.length; j++) {
    //                 if (utellyResults[i].locations[j].icon) {
    //                     $("#movie-view").append(
    //                         '<div class="streaming-list"><a target="_blank" href=' + utellyResults[i].locations[j].url +
    //                         '><img class="streaming-icons img-fluid" src=' + utellyResults[i].locations[j].icon + '></a></div>'
    //                     );
    //                 }
    //             }
    //         }
    //     });
    // });
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