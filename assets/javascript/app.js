var chemElements = ["Sodium", "Lithium", "Hydrogen", "Sulfur", "Aluminum", "Bismuth", "Carbon"];
var amount = 0;
var searchResult = {};

function renderButtons() {
    //console.log("inside renderButtons()")
    $('#buttons-view').empty();

    for (var i = 0; i< chemElements.length; i++) {
        var btn = $('<button>');
        btn.addClass('chemElement-btn');
        btn.attr('data-name', chemElements[i]);
        btn.text(chemElements[i]);
        $("#buttons-view").append(btn);
    }
}

function buildElements(amount, response) {
    console.log("inside buildElements");
    console.log("response: " + response);
    for (var i = 0; i < 10 + parseInt(amount); i++) {
        var chemElementDiv = $("<div class='element'>");
        var rating = response.data[i].rating;
        var titleLong = response.data[i].title;
        console.log(titleLong);
        var shortTitle = titleLong.split('GIF',1);
        var p = $("<p>Title: " + shortTitle + "<br>" + "Rating: "+ rating + "</p>");
        chemElementDiv.append(p);

        var sourceURL = response.data[i].source_post_url;
        //console.log("sourceURL: " + sourceURL);
        var giphURL_still = response.data[i].images.downsized_still.url;
        //console.log("giphURL_still: " + giphURL_still);
        var giph = $("<img>").attr("src", giphURL_still);
        giph.attr("data-still", response.data[i].images.downsized_still.url);
        giph.attr("data-animated", response.data[i].images.downsized.url);
        giph.attr("data-state", "still");
        giph.addClass('gif');
        chemElementDiv.append(giph);
        $('#chemElements-view').append(chemElementDiv);
    }
}

function displayElementInfo() {
    $('#chemElements-view').empty();
    //console.log("inside displayElementInfo()")
    var element = $(this).attr('data-name');
    var apiKey = 's7Ii19O5I1mMvJO3OLiujTBrv1pMSFzB';
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
    "&q=" + element+ "&limit=100&offset=0&rating=G&lang=en";
    //console.log("queryURL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        searchResult = response;
        console.dir(searchResult);
        buildElements(amount, searchResult);
        var moreBTN = $("<button>");
        moreBTN.attr("id", "moreBTN");
        moreBTN.text("Show more");
        $('#chemElements-view').append(moreBTN);
    })
}

function pauseAndPlay() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
}

function displayMoreGifs() {
    amount = amount + 10;
}

$('#addElement').on('click', function(event) {
    //console.log("inside event handler");
    event.preventDefault();
    var newElement = $('#ce-input').val().trim();
    if (newElement.length > 0) {
        chemElements.push(newElement);
        //console.log("chemElements: " + chemElements);
        renderButtons();
    }
})

$(document).on('click', '.chemElement-btn', displayElementInfo);
$(document).on('click', '.gif', pauseAndPlay);
$(document).on('click', '#moreBTN', );
renderButtons();