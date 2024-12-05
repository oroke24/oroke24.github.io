function attachObserver(user){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/v8/firebase.User
			logoutButton.style.display = 'inline-block';
			var uid = user.uid;
			console.log("uid: ", uid);
			localStorage.setItem('userUID', uid);//when retrieving, use: localStorage.getItem('userUID');
			//getUserData(user.uid);
			// ...
		} else {
			 console.log("No user signed in");
			// User is signed out
			// ...
		}
	});
}

//Call this function when app initializes 
attachObserver();