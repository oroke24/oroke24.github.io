// Fetch all items from Firestore and update the page list
//listType is an int from 0-3 to represent different item.display methods 
//(in assets/js/items/item.js)
function refreshList(divId, listType = 1) {
    const isAdmin = checkAdminStatus(localStorage.getItem('userUID'));
    const itemList = document.getElementById(divId); // Assuming you have an itemList container
	itemList.innerHTML = ''; // Clear the existing list

    showLoading('Refreshing inventory...'); // Show loading modal

    return getAllFromInventory().then((items) => {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('editItem');
            listItem.textContent = item.display(listType);
            if(isAdmin) listItem.addEventListener('click', () => { editItem(item) });
            else listItem.addEventListener('click', () => { viewItem(item) });
            itemList.appendChild(listItem);
        });

        hideLoading(); // Hide loading modal after the list is updated
    }).catch((error) => {
        console.log("Error fetching inventory: ", error);
        hideLoading(); // Hide loading modal even on error
    });
}
function refreshEditList(divId, listType = 1) {
    //console.log("uid: ", localStorage.getItem('userUID'));
        console.log("in refreshList(divId): ", divId);
        const itemList = document.getElementById(divId); // Assuming you have an itemList container
		itemList.innerHTML = ''; // Clear the existing list

    showLoading('Refreshing inventory...'); // Show loading modal

    return getAllFromInventory().then((items) => {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('editItem');
            listItem.textContent = item.display(listType);
            listItem.addEventListener('click', () => { editItem(item, divId, listType) });
            itemList.appendChild(listItem);
        });

        hideLoading(); // Hide loading modal after the list is updated
    }).catch((error) => {
        console.log("Error fetching inventory: ", error);
        hideLoading(); // Hide loading modal even on error
    });
}
