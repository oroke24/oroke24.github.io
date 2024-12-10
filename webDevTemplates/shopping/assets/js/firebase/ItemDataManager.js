class ItemDataManager {
	constructor(){
		//this.items = getAllItems(); 
	}
	/////////////////////////////////////////////////////////////////////////////
	addNewItem(item, listStyle = 1){
		showLoading();
		return db.collection('inventory').add(item)
		.then((success) =>{
			item.id = success.id;
			success.update({id:success.id});
			hideLoading();
			//refreshList(listStyle);
		})
		.catch((error) =>{
			console.log("error adding document to db: ", error);
		})
		.finally(() =>{
			hideLoading();
		});	
	}
	/////////////////////////////////////////////////////////////////////////////
	updateItem(item){
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
	/////////////////////////////////////////////////////////////////////////////
	deleteItem(id) {
		showLoading();
		// Assuming the collection is 'inventory' and you want to delete by item.id
		//console.log("Deleting item with ID: ", id);
		  //console.log("Item: ", id);
		  return db.collection('inventory').doc(id).delete()
		    .then(() => {
			  hideLoading();
			//refreshList();
			  console.log(`Item with ID: ${id} deleted successfully.`);
			  return true;
			})
			.catch((error) => {
			  hideLoading();
			  alert("Error deleting document, try again.");
			  console.log("Error deleting document from DB: ", error);
			  return false;
			})
			.finally(() => {
			    hideLoading();
			});
	}
	/////////////////////////////////////////////////////////////////////////////
	getAllItems(){return true;}
	/////////////////////////////////////////////////////////////////////////////
	updateDb(){return true;}
}
window.itemDataManager = new ItemDataManager();