var database = firebase.database();

var sample = {
  firstName: 'yet',
  lastName: 'another value'
};

function createElements(){
  var firebaseButton = $('<button>');
  firebaseButton.html('firebase!');
  firebaseButton.attr('id', 'firebase-button');
  firebaseButton.attr('class', 'btn btn-primary');
  $('#firebase-card').append(firebaseButton);
}

function setUpClickFirebase() {
  $(document).on('click', '#firebase-button', function () {
    console.log('fired');
    database.ref().push(sample);
  });
}

function setUpFireBaseOnValue() {
  database.ref().on('value', function (snapshot) {
    $('#firebase-card-text').html(JSON.stringify(snapshot.val()))
  }, function (error) {
    console.log('write failed: ' + error.code)
  })
}

function logCurrentTime() {
  var date = new Date();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  console.log('current time is: ' + hours + ': ' + minutes);
  // without reloading the page I can update all my elements on the
  // page here with proper time
}

function startTimer() {
  setInterval(function(){
    logCurrentTime();
  }, 1000);
};

$(document).ready(function () {
  // organize your library of functions that do specific things
  // and then here call them in the proper order
  createElements();
  setUpClickFirebase();
  setUpFireBaseOnValue();
  startTimer();
})