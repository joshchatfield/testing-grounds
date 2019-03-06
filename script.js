// create globals
var database = firebase.database();
var sample = {
  firstName: 'yet',
  lastName: 'another value'
};

// create the firebase button
function createElements(){
  var firebaseButton = $('<button>');
  firebaseButton.html('firebase!');
  firebaseButton.attr('id', 'firebase-button');
  firebaseButton.attr('class', 'btn btn-primary');
  $('#firebase-card').append(firebaseButton);
}

// when firbase button is clicked push the sample object
function setUpClickFirebase() {
  $(document).on('click', '#firebase-button', function () {
    console.log('fired');
    database.ref().push(sample);
  });
}

// displays the contents of the database in card-body
function setUpFireBaseOnValue() {
  database.ref().on('value', function (snapshot) {
    $('#firebase-card-text').html(JSON.stringify(snapshot.val()))
  }, function (error) {
    console.log('write failed: ' + error.code)
  })
}

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

// when document is ready call my functions in proper order
$(document).ready(function () {
  createElements();
  setUpClickFirebase();
  setUpFireBaseOnValue();
  startTimer();
})