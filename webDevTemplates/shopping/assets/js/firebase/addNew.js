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