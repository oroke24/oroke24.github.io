function login(email, password){
    console.log("you made it to firebase.login");
	firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
		console.log("login successful");
        return true;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
	console.log("login unsuccessful");
    return false;
  });
}