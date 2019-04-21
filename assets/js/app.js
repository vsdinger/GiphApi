var api = [
	"Big Eyes","Cloud","Flowers", "Happy", "Moon", "Wind", "Rain", "Snow", "Playing Children", "Big smiles", "Joy"
];

for(var i = 0; i < api.length; i++) {
	var button = $("<button>").text(api[i]);
	button.attr("data-blessing", api[i]);
	button.addClass("blessing-button");
	$("#button-group").append(button);
}

$("#add-blessing-button").on("click", function(e) {
	e.preventDefault();
	var alreadyExist = false;
	if(api.indexOf($("#new-blessing-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#new-blessing-input").val() !== "" && alreadyExist === false) {
		var newBlessing = $("#new-blessing-input").val().toLowerCase();
		api.push(newBlessing);
		var button = $("<button>").text(newBlessing);
		button.attr("data-blessing", newBlessing);
		button.addClass("blessing-button");
		$("#button-group").append(button);
	}
	$("#new-blessing-input").val("");
});

$(document).on("click", ".blessing-button", function() {
	var blessing = $(this).attr("data-blessing");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        blessing + "&api_key=PaYTYKANE6VYZVwjUmBN05iCxDoFYSbo&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	// console.log(results);

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var blessingImg = $("<img class='result'>");
    		blessingImg.attr("src", results[i].images.fixed_height_still.url);
    		blessingImg.attr("data-state", "still");
    		blessingImg.attr("data-still", results[i].images.fixed_height_still.url);
    		blessingImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(blessingImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#blessing-group").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});