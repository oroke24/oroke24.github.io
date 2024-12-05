const logoutButton = document.getElementById('logoutButton');
//Step 8: handle logout
logoutButton.addEventListener('click', function(){
	console.log("you made it to the logout logic");
    firebase.auth().signOut().then(() => {
        // Clear UID from localStorage or sessionStorage
		localStorage.removeItem('userUID');
		sessionStorage.removeItem('userUID');
		console.log('User signed out and UID cleared');
	}).catch(error => {
		console.error('Error signing out:', error);
	});
})
