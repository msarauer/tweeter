$(document).ready(function() {
  //changes the counter as you type in the textarea
  $("#tweet-text").on("input", function() {
    const currentLength = $(this).val().length;
    const charsLeft = 140 - currentLength;
    $(this).siblings(".send-tweet").children(".counter").html(charsLeft);
    if (charsLeft < 0) {
      $(this).siblings(".send-tweet").children(".counter").css("color", "red");
    } else {
      $(this).siblings(".send-tweet").children(".counter").css("color", "#545149");
    }
  });
});

