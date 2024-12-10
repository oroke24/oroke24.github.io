/*
class authorizationManager{
	constructor();
	register(email, password);
	login(email, password);
	logout();
	}
*/
class AuthorizationManager {
	constructor(){}
	/////////////////////////////////////////////////////////////////////////////
	checkAdminStatus(){
		//console.log("uid: ", uid);
		if(!uid) return false;
		return db.collection('adminList').where("uid", "==", uid).get()
		.then(snapshot =>{
			if(snapshot.empty) return false; //is not an admin
			else return true;  //is an admin
		})
		.catch(error =>{
		console.error("Error in checkAdminStatus: ", error);
		});
	}
	/////////////////////////////////////////////////////////////////////////////
	register(email, password){
		 return firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in 
			var user = userCredential.user;
			return user.sendEmailVerification()
			.then(() => {
				alert("Check Email for link (resets in 24hrs)");
				console.log("Sign up successful, verification email sent.");
				registerModal.style.display = 'none'; // Close the modal on success
				return true;
			}).catch((error) => {
				console.log("Error sending verification email: ", error.message);
				return false;
			});
		})
		.catch((error) => {
		    var errorCode = error.code;
		    var errorMessage = error.message;
			console.log(email, ":", errorMessage);
			alert(errorMessage);
			return false;
		    // ..
		});
	}
	/////////////////////////////////////////////////////////////////////////////
	login(email, password){
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
        })
		.catch((error) => {
			alert("Incorrect Email/Password");
			return false;
		});
	}
	/////////////////////////////////////////////////////////////////////////////
	logout(){
		firebase.auth().signOut().then(() => {
        // Clear UID from localStorage or sessionStorage
		localStorage.removeItem('userUID');
		sessionStorage.removeItem('userUID');
		console.log('User signed out and UID cleared');
	}).catch(error => {
		console.error('Error signing out:', error);
	});
	}

}
//Create one instance of AuthorizationManager
//And make the insance globally accessible
window.authorizationManager = new AuthorizationManager();