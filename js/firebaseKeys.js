let keyValue = "no key yet";
function findMyKey(keyName) {
	return db.collection('keys').get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				if (doc.id == keyName) {
					keyValue = doc.data().key;
					console.log("Found matching key!: ");
				}
			});
			return keyValue;
		})
		.catch(errror => {
            console.error("Error getting key!: ", error);
            alert("Error fetching data. Please try again.");
		});
}