function addNewItem(item){
	showLoading();
	return db.collection('inventory').add(item)
	.then((success) =>{
		item.id = success.id;
		success.update({id:success.id});
		hideLoading();
		//refreshList();
	})
	.catch((error) =>{
		console.log("error adding document to db: ", error);
	})
	.finally(() =>{
		hideLoading();
	});	
}

function updateItem(item){
	showLoading();
	return db.collection('inventory').doc(item.id).update(item)
	.then((success) =>{
		hideLoading();
		//refreshList();
	})
	.catch((error) =>{
		console.log("error updating document to db: ", error);
	})
	.finally(() =>{
		hideLoading();
	});	
}