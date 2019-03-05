var database = firebase.database();

var sample =
{
  firstName: 'josh',
  lastName: 'chatfie'
};


$('#firebaseButton').on('click', function () {
  console.log('button fired');
  database.ref().push(sample);
  database.ref().on('value', function (snapshot) {
    console.log(snapshot.val());  
  }, function (error) {
    console.log('write failed: ' + error.code)
  })


})
