// create globals
var database = firebase.database();

/* --------------------------- NYT FUNCTIONS -------------------- */

// return a NYT api query url
function getNYTQueryURL(searchTerm) {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  queryParams.q = searchTerm;
  return queryURL + $.param(queryParams);
}

// run ajax call on NYT API
function getNYTAJAXResult(queryURL) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: queryURL,
      method: 'get'
    }).then(function (result) {
      resolve(result);
    });
  });
}

// log result of NYT API AJAX
function displayNYTResult(result) {
  console.log(result);
}

/* --------------------------- FIREBASE FUNCTIONS -------------------- */

// create the firebase button
function createElements(){
  var firebaseButton = $('<button>');
  firebaseButton.html('firebase!');
  firebaseButton.attr('id', 'firebase-button');
  firebaseButton.attr('class', 'btn btn-primary');
  $('#firebase-card').append(firebaseButton);
}

function getObjectToBePushed() {
  // use this space to get the information to be included in the object
  var sampleObject = {
    firstName: 'yet',
    lastName: 'another value'
  };
  return sampleObject;
}

// when firbase button is clicked push the sample object
function setUpClickFirebase() {
  $(document).on('click', '#firebase-button', function () {
    console.log('fired');
    database.ref().push(getObjectToBePushed());
  });
}

// create and event handler that displays the contents of the database
// in card - body initially and on change
function setUpFireBaseOnValue() {
  database.ref().on('value', function (snapshot) {
    $('#firebase-card-text').html(JSON.stringify(snapshot.val()))
  }, function (error) {
    console.log('write failed: ' + error.code)
  })
}

/* --------------------------- TIMER FUNCTIONS -------------------- */

// what happens every interval event
function logCurrentTime() {
  var date = new Date();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  console.log('current time is: ' + hours + ': ' + minutes);
  // without reloading the page I can update all my elements on the
  // page here with proper time
}

// start the 1 second interval timer
function startTimer() {
  setInterval(function(){
    logCurrentTime();
  }, 1000);
};

/* --------------------------- MAIN LOGIC -------------------- */

// when document is ready call my functions in proper order
$(document).ready(function () {
  createElements();
  setUpClickFirebase();
  setUpFireBaseOnValue();
  startTimer();
  getNYTAJAXResult(getNYTQueryURL('president'))
    .then(function (result) {
      displayNYTResult(result)
    });
})