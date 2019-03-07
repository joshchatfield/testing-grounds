// there are multiple ways to handle async information
  // create an async function that uses await
  // create a regular function that returns a promise
// https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

// create globals
var database = firebase.database();

/* --------------------------- NYT FUNCTIONS -------------------- */

var NYT = {
// return a NYT api query url
getQueryURL: function (searchTerm) {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
    queryParams.q = searchTerm;
    return queryURL + $.param(queryParams);
  },

  // run ajax call on NYT API
  getAJAXResult: function (queryURL) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: queryURL,
        method: 'get'
      }).then(function (result) {
        resolve(result);
      });
    });
  },

  // log result of NYT API AJAX
  displayQueryResult: function (result) {
    console.log(result);
  }
}
/* --------------------------- FIREBASE FUNCTIONS -------------------- */

var firebase = {
  // create the firebase button
  createButton: function (){
    var firebaseButton = $('<button>');
    firebaseButton.html('firebase!');
    firebaseButton.attr('id', 'firebase-button');
    firebaseButton.attr('class', 'btn btn-primary');
    $('#firebase-card').append(firebaseButton);
  },

  getObjectToBePushed: function () {
    // use this space to get the information to be included in the object
    var sampleObject = {
      firstName: 'yet',
      lastName: 'another value'
    };
    return sampleObject;
  },

  // when firbase button is clicked push the sample object
  setUpClickEvent: function () {
    $(document).on('click', '#firebase-button', function () {
      console.log('fired');
      database.ref().push(firebase.getObjectToBePushed());
    });
  },

  // create and event handler that displays the contents of the database
  // in card - body initially and on change
  setUpOnValueEvent: function () {
    database.ref().on('value', function (snapshot) {
      $('#firebase-card-text').html(JSON.stringify(snapshot.val()))
    }, function (error) {
      console.log('write failed: ' + error.code)
    })
  }
}
/* --------------------------- TIMER FUNCTIONS -------------------- */

var timer = {
  // what happens every interval event
  logCurrentTime: function () {
    var date = new Date();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    console.log('current time is: ' + hours + ': ' + minutes);
    // without reloading the page I can update all my elements on the
    // page here with proper time
  },

  // start the 1 second interval timer
  startTimer: function () {
    setInterval(function(){
      timer.logCurrentTime();
    }, 1000);
  }
}
/* --------------------------- MAIN LOGIC -------------------- */

// when document is ready call my functions in proper order
$(document).ready(function () {
  firebase.createButton();
  firebase.setUpClickEvent();
  firebase.setUpOnValueEvent();
  timer.startTimer();
  NYT.getAJAXResult(NYT.getQueryURL('president'))
    .then(function (result) {
      NYT.displayQueryResult(result)
    });
})