/*
class itemDataManager{
	constructor();
	addNewItem();
	updateItem();
	deleteItem();
	getAllFromInventory(id);
	refreshList(divId, listType);
	getImage();
	addNewImage();
	}
*/
class ItemDataManager {
	constructor(){
		//this.items = getAllFromInventory(); 
	}
	//ADD NEW ITEM///////////////////////////////////////////////////////////////////////////
	addNewItem(item, parentDiv, listStyle = 1){
		showLoading();
		return db.collection('inventory').add(item.jsonObject())
		.then((success) =>{
			item.id = success.id;
			success.update({id:success.id});
			hideLoading();
			this.refreshList(parentDiv, listStyle);
			console.log("in itemDataManager, images:", images);
			item.images.forEach(imageUrl =>{
				addNewImage(imageUrl, item);
			});
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
	deleteItem(id, parentDiv, listStyle = 1) {
		showLoading();
		  return db.collection('inventory').doc(id).delete()
		    .then(() => {
			  hideLoading();
			  this.refreshList(parentDiv, listStyle);
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
	//LOAD IMAGES///////////////////////////////////////////////////////////////////////////
	loadImage(){
		return true;
	}
	//ADD NEW IMAGE///////////////////////////////////////////////////////////////////////////
	addNewImage(file, item){
		console.log('entering addNewImage.');
		// Ensure a file was selected
		if (!file) {
			console.error('No file selected.');
			return;
		}
		console.log("item.images.length: ", item.images.length);
		if(item.images.length > 4){
			console.log('This item has too many images to add more.')
			return;
		}

		const storageRef = storage.ref().child('images/' + item.id  + '/' + file.name); // Create a reference to the image location
		const uploadTask = storageRef.put(file);

		// Monitor upload progress
		uploadTask.on('state_changed', 
			(snapshot) => {
			// Calculate and log the progress (percentage)
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			//showLoading();
			console.log('Upload is ' + progress.toFixed(2) + '% done');
			},
			(error) => {
			// Handle errors during upload
			console.error('Error uploading file:', error);
			//alert('Error Uploading file: ', error);
			//hideLoading();
			},
			() => {
			// Handle completion
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				console.log('File available at', downloadURL);
				//hideLoading();
				// You can use this URL for displaying the image, saving it, etc.
		});
	}
  );
	}
}
window.itemDataManager = new ItemDataManager();