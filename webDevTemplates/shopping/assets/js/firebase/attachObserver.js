function attachObserver(user){
	firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
}