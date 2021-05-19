/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const x = document.getElementsByClassName('need_to_be_rendered');
  x[0].innerHTML = $.timeago(new Date());
});