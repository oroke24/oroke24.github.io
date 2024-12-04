function login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			console.log("user exists");
        
        if(user.emailVerified){
            console.log("Email is verified.");
            attachObserver(user);
            return true;
        }else{
            console.log("Email not verified.");
            alert("Email is not verified. Please check email for verification link.")
            return false;
        }
    // ...
        })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
	console.log("login unsuccessful");
    return false;
  });
}