function login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			console.log("email exists");
        
        if(user.emailVerified){
            console.log("Email is verified.");
            attachObserver(user);
            return true;
        }else{
            console.log("Email not verified.");
            resendVerificationButton.style.display = 'inline-block';
            errorMessage.textContent = 'Email is not verified. Please check email for verification link.';
            return false;
        }
    // ...
        })
  .catch((error) => {
    alert("Incorrect Email/Password");
    return false;
  });
}