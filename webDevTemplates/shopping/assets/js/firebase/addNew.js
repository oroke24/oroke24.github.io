function addNewItem(item){
	return db.collection('inventory').add(item.jsonObject())
	.then((success) =>{
		console.log("success adding new item.");
	})
	.catch((error) =>{
		console.log("error adding document to db: ", error);
	});	
}