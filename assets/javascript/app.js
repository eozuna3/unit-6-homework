$(document).ready(function () {
    // Initial array of movies
    var topics = ["avocados", "pecans", "olive oil", "butter"];



    //Ajax Query Variables and Function
    function displayGifInfo() {

      var food = $(this).val();
      food = food.replace(/ /g, "+");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=MxJ2uqQSNXnKFLKTEN5VoLMwQzA2Jfc9&q=" + food + "&limit=10&offset=0&rating=PG&lang=en";
      console.log(food);
      console.log(queryURL);
    

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
        var foodArray = response.data;
        console.log(foodArray);

        for (let index = 0; index < foodArray.length; index++) {
          var foodDiv = $("<div>");
          console.log(foodArray[index].url);
          var foodGif = $("<img>").attr("src", foodArray[index].images.fixed_width_still.url);
          console.log(foodArray[index].rating);
          var foodRating = $("<p>").text("Rating: " + foodArray[index].rating).css("color", "white");

          foodDiv.append(foodGif);
          foodDiv.append(foodRating);
          $("#food-view").append(foodDiv);
          
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

      // This function handles events the add food button is clicked
      $("#add-food").on("click", function(event) {
        event.preventDefault();
        
        // This line of code will grab the input from the textbox
        var inputFood = $("#food-input").val().trim().toLowerCase();
        console.log(inputFood);
        
        // The food from the textbox is then added to our array
        topics.push(inputFood);

        // Calling renderButtons which handles the processing of our food array
        renderButtons();
      });
      
      
      // Add Onclick event for buttons to use API to get and display Giphy info
      $(document).on("click", ".food", displayGifInfo);


      renderButtons();

      //End of javascript
});