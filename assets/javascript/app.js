$(document).ready(function () {
  // Initializing array of Food
  var topics = [];
  var rowAssignment = 0;

 // Function that displays the gifs associated with the buttons selected
  function displayGifInfo() {
    // Clear out existing images and ratings
    //$("#gifContainer").empty();
    
    // Establish variables for function and API query string
    var food = $(this).val();
    food = food.replace(/ /g, "+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=MxJ2uqQSNXnKFLKTEN5VoLMwQzA2Jfc9&q=" + food + "&limit=10&offset=0&rating=PG&lang=en";
    console.log(food);
    console.log(queryURL);

    // API Query and Function to create html gifs using information from the returned JSON
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var foodArray = response.data;
      console.log(foodArray);

      for (let index = 0; index < foodArray.length; index++) {
        var temp = index%3;
        console.log(temp);
        var foodColumnDiv = $("<div>");
        foodColumnDiv.addClass("col-md-4");
        console.log(foodArray[index].url);

        // Create Gif Image tags along with attributes to allow for activating each gif when clicked
        var foodGif = $("<img>").attr("src", foodArray[index].images.fixed_width_still.url);
        foodGif.attr("data-state", "still");
        foodGif.attr("data-still", foodArray[index].images.fixed_width_still.url);
        foodGif.attr("data-animate", foodArray[index].images.fixed_width.url);
        foodGif.addClass("img-fluid Gif");
        var foodRating = $("<p>").text("Rating: " + foodArray[index].rating).css("color", "white");

        // Appending Gif and ratings elements to new Div element
        foodColumnDiv.append(foodGif);
        foodColumnDiv.append(foodRating);

        if(temp === 0){
          var foodRowDiv = $("<div>");
          foodRowDiv.addClass("row my-5");
          $("#gifContainer").append(foodRowDiv);
          foodRowDiv.append(foodColumnDiv);
        } else {
          foodRowDiv.append(foodColumnDiv);
        }
      }
    });
  }

  // Creation of buttons function
  function renderButtons() {
    $("#buttons-view").empty();
    for (let index = 0; index < topics.length; index++) {
      var temp = $("<button>");
      temp.addClass("btn btn-info btn-sm mx-2 food");
      temp.text(topics[index]);
      temp.val(topics[index]);
      $("#buttons-view").append(temp);
    }
  }

  // Function that activates gif images
  $(document).on("click", ".Gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // This function handles events the add food button is clicked
  $("#add-food").on("click", function (event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var inputFood = $("#food-input").val().trim().toLowerCase();
    var usedFood = false;
    console.log(inputFood);

    // Check to make sure food choice wasn't already entered
    for (var index = 0; index < topics.length; index++) {
      if (inputFood === topics[index]) {
        usedFood = true;
        alert("This food selection has already been entered. Please enter a different food choice in the text box");
        $("#food-input").val("");
        break;
      }
    }
    
    // Add entered food choice into the food array
    if (!usedFood) {
      topics.push(inputFood);
      $("#food-input").val("");
      renderButtons();
    }
  });


  // Add Onclick event for buttons to use API to get and display Giphy info
  $(document).on("click", ".food", displayGifInfo);

  //End of javascript
});