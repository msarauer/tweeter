/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //sets timeago up to display the date posted below tweets
  const x = document.getElementsByClassName('need_to_be_rendered');
  $('#error-message').hide();
  loadTweets(renderAllTweets);

  $('form').on('submit', function(event){
    event.preventDefault();
    const data = $(this).serialize();
    const text = decodeURIComponent(data.substring(5));//decoded the urlencoded string
    
    if (text.length === 0) {
      const errMessage = 'Tweets cannot be blank.'
      $('#error-message').hide();
      $('#error-message').empty();
      $('#error-message').append(createError(errMessage));
      $("#error-message").slideDown("slow");
      $('textarea').focus();
    } else if (140 < text.length) {
      const errMessage = 'Tweets cannot exceed 140 characters.'
      $('#error-message').hide();
      $('#error-message').empty();
      $('#error-message').append(createError(errMessage));
      $("#error-message").slideDown("slow");
      $('textarea').focus();
    } else {
      $('#error-message').hide();
      $.post('/tweets/', data, function() {
        loadTweets(renderLatestTweets);
        $("#tweet-text").val("");
      });
      $('textarea').focus();
    }
    
  })
});

const createTweetElement = (tweet) => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeInput = escape(tweet.content.text);
  
  const $newTweet = 
  `
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
  `
  return $newTweet;
};

const createError = errMessage => {
  const $err = (`<div class="alert-box error"><i class="fas fa-times-circle"></i><span>error: </span>${errMessage}</div>`);
  return $err;
};

const renderAllTweets = (tweetArr) => {
  for (const item of tweetArr) {
    $('#tweet-container').prepend(createTweetElement(item));
  }
};

const renderLatestTweets = tweetArr => {
  const latest = tweetArr[tweetArr.length - 1];
  $('#tweet-container').prepend(createTweetElement(latest));
};

const loadTweets = (whichToRender) => {
  $.get('/tweets/', whichToRender);
};


