function register(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
	    // Signed in 
		firebase.auth().sendEmailVerification();
		alert("Check Email for link (resets in 24hrs)");
	    var user = userCredential.user;
		console.log("sign up successful");
		return true;
	})
	.catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
		console.log("sign up unsuccessful");
		return false;
	    // ..
	});
}