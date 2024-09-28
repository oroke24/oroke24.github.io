let keyValue = "no key yet";
function findMyKey(keyName) {
	console.log("inside findMyKey");
	return db.collection('keys').get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				if (doc.id == keyName) {
					keyValue = doc.data().key;
					console.log("Key fetched");
				}
			});
			return keyValue;
		})
		.catch(errror => {
            console.error("Error getting key!: ", error);
            alert("Error fetching data. Please try again.");
		});
}