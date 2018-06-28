var chemElements = ["sodium", "lithium", "hydrogen", "sulfur", "argon" ]

function renderButtons() {
    console.log("inside renderButtons()")
    $('#ce-view').empty();

    for (var i = 0; i< chemElements.length; i++) {
        var btn = $('<button>');
        btn.addClass('chemElement-btn');
        btn.attr('data-name', chemElements[i]);
        btn.text(chemElements[i]);
        $("#buttons-view").append(btn);
    }
}

function displayElementInfo() {
    $('#chemElements-view').empty();
    console.log("inside displayElementInfo()")
    var element = $(this).attr('data-name');
    var apiKey = 's7Ii19O5I1mMvJO3OLiujTBrv1pMSFzB';
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
    "&q=" + element+ "&limit=10&offset=0&rating=G&lang=en";
    console.log("queryURL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.dir(response);
        var chemElementDiv = $("<div class='element'>");
        for (var i = 0; i < 10; i++) {
            var rating = response.data[i].rating;
            console.log("rating: " + response.data[i].rating);
            var p = $("<p>").text("Rating: " + rating);
            chemElementDiv.append(p);
            var sourceURL = response.data[i].source_post_url;
            console.log("sourceURL: " + sourceURL);
            var giphURL_still = response.data[i].images.original_still.url;
            console.log("giphURL: " + giphURL_still);
            var giph = $("<img>").attr("src", giphURL_still);
            chemElementDiv.append(giph);
            $('#chemElements-view').append(chemElementDiv);
        }
    })
}

$('#addElement').on('click', function(event) {
    console.log("inside event handler");
    event.preventDefault();
    var newElement = $('#ce-input').val().trim();
    chemElements.push(newElement);
    console.log("chemElements: " + chemElements);
    renderButtons();
})

$(document).on('click', '.chemElement-btn', displayElementInfo);
renderButtons();