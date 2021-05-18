$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    currentLength = $(this).val().length;
    charsLeft = 140 - currentLength;
    $(this).siblings(".send-tweet").children(".counter").html(charsLeft);
    if (charsLeft < 0) {
      $(this).siblings(".send-tweet").children(".counter").css("color", "red");
    } else {
      $(this).siblings(".send-tweet").children(".counter").css("color", "#545149");
    }
  });
});