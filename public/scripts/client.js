/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //sets timeago up to display the date posted below tweets
  const x = document.getElementsByClassName('need_to_be_rendered');
  // x[0].innerHTML = $.timeago(1461116232227);


  // Test / driver code (temporary)

  renderTweets(data);


});

const createTweetElement = (tweet) => {
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
          ${tweet.content.text}
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

const renderTweets = (tweetArr) => {
  for (const item of tweetArr) {
    $('#tweet-container').prepend(createTweetElement(item));
  }
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 2161116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

