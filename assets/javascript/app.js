

// Event listener for all button elements
// $("button").on("click", function() {


var nesGames = ["The Legend of Zelda", "Metroid", "Jackal", "Super Mario Bros. 3", "Ghosts N' Goblins", "Heavy Barrel",
    "Metal Gear", "Guerilla War", "Ikari Warriors", "Star Soldier"];


// Function for displaying game data
function renderButtons() {

    // Deleting the games prior to adding new games; prevention for repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of games
    for (var i = 0; i < nesGames.length; i++) {

        // Dynamically generating buttons for each game in the array
        var a = $("<button>");
        // Adding a class of game-btn to our button
        a.addClass("btn game-btn");
        // Adding a data-attribute
        a.attr("data-name", nesGames[i]);
        // Providing the initial button text
        a.text(nesGames[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a game button is clicked
$("#add-game").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var nesGame = $("#game-input").val().trim();

    // Adding game from the textbox to our array
    nesGames.push(nesGame);

    // Calling renderButtons which handles the processing of our game array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "game-btn"
$(document).on("click", ".game-btn", function () {
    {


        // may not need the .attr("data-name") for var nesGame
        var nesGame = $(this).attr("data-name").split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cZWfcmU9Q4EPAouDfubWCyrZEdNPwAKf&limit=10&q="


            // AJAX call to the giphy API to retrieve "Get" the requested game data and "then", carry out f(response)"
            $.ajax({
                url: queryURL + nesGame,
                method: "GET"

                // After the data comes back from the API
            }).then(function (response) {

                // Storing an array of results in the var results
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // If statement for taking action ONLY (IF) the photo has an appropriate rating
                    // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {


                        // Creating a div to hold the game
                        var gameDiv = $("<div class = game>");

                        // Storing the retrieved game rating data
                        var rating = results[i].rating;

                        // Creating an element to have the game rating displayed on the page
                        var pOne = $("<p>").text("Rating: " + rating);

                        // Displaying the game rating with the gameDiv
                        gameDiv.append(pOne);

                        // Creating an image tag
                        var gameImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off of the result item
                        gameImage.attr("src", results[i].images.fixed_height_still.url);

                        // Appending the paragraph and gameImage to the "gameDiv" div 
                        gameDiv.append(pOne);
                        gameDiv.append(gameImage);

                        // Appending the gif to display following the gifs that preceded 
                        $("#games-view").prepend(gameDiv);

                    
                }
            });
    }

});

// Calling the renderButtons function to display the intial buttons
renderButtons();
;
$(".game-btn").on("click", function() {
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
};
