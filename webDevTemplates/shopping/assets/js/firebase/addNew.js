function addNewItem(item){
	showLoading();
	console.log('you made it to addNewItem.');
	//const obj = item.jsonObject()
	return db.collection('inventory').add(item)
	.then((success) =>{
		item.id = success.id;
		success.update({id:success.id});
		//console.log("success adding new item.", success.id);
		hideLoading();
		refreshList();
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
	console.log('you made it to updateItem.');
	//const obj = item.jsonObject()
	return db.collection('inventory').doc(item.id).update(item)
	.then((success) =>{
		//console.log("success adding new item.", success.id);
		hideLoading();
		refreshList();
	})
	.catch((error) =>{
		console.log("error updating document to db: ", error);
	})
	.finally(() =>{
		hideLoading();
	});	
}