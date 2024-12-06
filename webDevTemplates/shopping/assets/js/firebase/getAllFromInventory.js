function getAllFromInventory(){
	return db.collection('inventory').get()
	.then((snapshot) =>{
		const items = [];
		for(let doc of snapshot.docs){
			console.log("doc: ", doc.data());
			//new item contains (name, description, price, quantity)
			const item = new Item(doc.data().name, doc.data().description, doc.data().price, doc.data().quantity, doc.data().createdOn, doc.data().isActive);
			items.push(item);
		}
		return items;
	})
	.catch((error) => {
		console.log("error fetching items: ", error);
	})
}