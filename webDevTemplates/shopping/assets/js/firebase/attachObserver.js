function attachObserver(user){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/v8/firebase.User
			var uid = user.uid;
			localStorage.setItem('userUID', uid);//when retrieving, use: localStorage.getItem('userUID');
		} else {
			 console.log("No user signed in, uid: ", uid);
			// User is signed out
		}
	});
}

//Calling function when app initializes 
attachObserver();