/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#error-message").hide();
  $("#new-tweet").hide();//submit new tweet form is initially hidden
  loadTweets(renderAllTweets);// renders all the tweets in the database on page load

  $("form").on("submit", function(event) {
    event.preventDefault();//prevents the default action of submitting the form
    const data = $(this).serialize();//creates a text string in standard URL-encoded notation
    const text = decodeURIComponent(data.substring(5)); //decoded the urlencoded string

    //error handling for no text and too long tweet
    if (text.length === 0) {
      const errMessage = "Tweets cannot be blank.";
      $("#error-message").hide();
      $("#error-message").empty();
      $("#error-message").append(createError(errMessage));
      $("#error-message").slideDown("slow");
      $("textarea").focus();
    } else if (140 < text.length) {
      const errMessage = "Tweets cannot exceed 140 characters.";
      $("#error-message").hide();
      $("#error-message").empty();
      $("#error-message").append(createError(errMessage));
      $("#error-message").slideDown("slow");
      $("textarea").focus();
    } else {
      $("#error-message").hide();
      $.post("/tweets/", data, function() {
        loadTweets(renderLatestTweets);//renders just the latest tweet
        $("#tweet-text").val("");
        $(".counter").html("140");
      });
      $("textarea").focus();
    }
  });

  //displays(or hides) the create tweet form
  $(".write-new-tweet").on("click", function() {
    if ($("#new-tweet").is(":hidden")) {
      $("#new-tweet").slideDown("slow");
      $("textarea").focus();
    } else {
      $("#new-tweet").slideUp("slow");
    }
  });

  //when not at the top of the window, show a scroll to top button and hide the write a tweet button
  $(window).scroll(function () {
    if($(this).scrollTop()) {
      $("#toTop").fadeIn();
      $(".write-new-tweet").fadeOut();
    } else {
      $("#toTop").fadeOut();
      $(".write-new-tweet").fadeIn();
    }
  });

  //animates a scroll to top
  $("#toTop").click(function () {
    $("body, html").animate({ scrollTop: 0 }, 1000);
    $("#new-tweet").slideDown("slow");
    $("textarea").focus();
  });
});

//function to create the tweet DOM element
const createTweetElement = (tweet) => {
  
  //prevents the user from inputting malicious input into the submit form
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeInput = escape(tweet.content.text);

  const $newTweet = `
  <article class="tweet">
        <header>
          <div class="top-left">
            <div>
              <img class="pic" src=${tweet.user.avatars}>
            </div>
            <div class="username">
              ${tweet.user.name}
            </div>
          </div>
          <div class="userID">
            ${tweet.user.handle}
          </div>
        </header>
        <div class="posted-tweet">
          ${safeInput}
        </div>
        <footer>
          <div class="date-posted need_to_be_rendered">${$.timeago(tweet.created_at)}</div>
          <div class="buttons">
            <button class="tweet-btn" type="Submit"><i class="fas fa-flag"></i></button>
            <button class="tweet-btn" type="Submit"><i class="fas fa-retweet"></i></button>
            <button class="tweet-btn" type="Submit"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>
  `;
  return $newTweet;
};

//function that creates an error message DOM element
const createError = (errMessage) => {
  const $err = `<div class="alert-box error"><i class="fas fa-times-circle"></i><span>error: </span>${errMessage}</div>`;
  return $err;
};

//renders all the tweets
const renderAllTweets = (tweetArr) => {
  for (const item of tweetArr) {
    $("#tweet-container").prepend(createTweetElement(item));
  }
};

//renders the latest tweet at the top
const renderLatestTweets = (tweetArr) => {
  const latest = tweetArr[tweetArr.length - 1];
  $("#tweet-container").prepend(createTweetElement(latest));
};

//gets the requested tweets from /tweets
const loadTweets = (whichToRender) => {
  $.get("/tweets/", whichToRender);
};
