async function register(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
	    // Signed in 
		var user = userCredential.user;
		return user.sendEmailVerification()
		.then(() => {
			alert("Check Email for link (resets in 24hrs)");
			console.log("Sign up successful, verification email sent.");
			return true;
		}).catch((error) => {
			console.log("Error sending verification email: ", error.message);
			return false;
		});
	})
	.catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
		console.log(email, " already registered.");
		return false;
	    // ..
	});
}