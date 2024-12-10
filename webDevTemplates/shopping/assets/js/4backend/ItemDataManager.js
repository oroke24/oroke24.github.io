/*
class itemDataManager{
	constructor();
	addNewItem();
	updateItem();
	deleteItem();
	getAllFromInventory(id);
	refreshList(divId, listType);
	}
*/
class ItemDataManager {
	constructor(){
		//this.items = getAllFromInventory(); 
	}
	//ADD NEW///////////////////////////////////////////////////////////////////////////
	addNewItem(item, parentDiv, listStyle = 1){
		showLoading();
		return db.collection('inventory').add(item)
		.then((success) =>{
			item.id = success.id;
			success.update({id:success.id});
			hideLoading();
			this.refreshList(parentDiv, listStyle);
		})
		.catch((error) =>{
			console.log("error adding document to db: ", error);
		})
		.finally(() =>{
			hideLoading();
		});	
	}
	//UPDATE///////////////////////////////////////////////////////////////////////////
	updateItem(item, parentDiv, listStyle = 1){
		showLoading();
		return db.collection('inventory').doc(item.id).update(item)
		.then((success) =>{
			hideLoading();
			this.refreshList(parentDiv, listStyle);
		})
		.catch((error) =>{
			console.log("error updating document to db: ", error);
		})
		.finally(() =>{
			hideLoading();
		});	
	}
	//DELETE///////////////////////////////////////////////////////////////////////////
	deleteItem(id, parendDiv, listStyle = 1) {
		showLoading();
		  return db.collection('inventory').doc(id).delete()
		    .then(() => {
			  hideLoading();
			  refreshList(parentDiv, listStyle);
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
	//GET ALL///////////////////////////////////////////////////////////////////////////
	getAllFromInventory(){
		return db.collection('inventory').get()
		.then((snapshot) =>{
			const items = [];
			for(let doc of snapshot.docs){
				//console.log("doc: ", doc.data());
				//new item contains (name, description, price, quantity)
				const item = new Item(doc.data().id, doc.data().name, doc.data().description, doc.data().price, doc.data().quantity, doc.data().createdOn, doc.data().isActive, doc.data().quantitySold);
				items.push(item);
			}
			return items;
		})
		.catch((error) => {
			console.log("error fetching items: ", error);
		})
	}
	//REFRESH LIST///////////////////////////////////////////////////////////////////////////
	refreshList(divId, listType = 1) {
		const isAdmin = window.authorizationManager.checkAdminStatus(localStorage.getItem('userUID'));
		const itemList = document.getElementById(divId); // Assuming you have an itemList container
		itemList.innerHTML = ''; // Clear the existing list
	
	    showLoading('Refreshing inventory...'); // Show loading modal
	
	    return this.getAllFromInventory().then((items) => {
	        items.forEach(item => {
	            const listItem = item.display(listType);/*document.createElement('div');
	            listItem.textContent = item.display(listType);
				*/
	            listItem.classList.add('editItem');
	            if(isAdmin) listItem.addEventListener('click', () => { editItem(item, divId, listType) });
	            else listItem.addEventListener('click', () => { viewItem(item, divId, listType) });
	            itemList.appendChild(listItem);
	        });
	
	        hideLoading(); // Hide loading modal after the list is updated
	    }).catch((error) => {
	        console.log("Error fetching inventory: ", error);
	        hideLoading(); // Hide loading modal even on error
	    });
	}
}
window.itemDataManager = new ItemDataManager();