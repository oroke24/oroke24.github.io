// Fetch all items from Firestore and update the page list
function refreshList() {
    const itemList = document.getElementById('itemList'); // Assuming you have an itemList container
    itemList.innerHTML = ''; // Clear the existing list

    showLoading('Refreshing inventory...'); // Show loading modal

    getAllFromInventory().then((items) => {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('editItem');
            listItem.textContent = item.displayNameDateActive();
            listItem.addEventListener('click', () => { editItem(item) });
            itemList.appendChild(listItem);
        });

        hideLoading(); // Hide loading modal after the list is updated
    }).catch((error) => {
        console.log("Error fetching inventory: ", error);
        hideLoading(); // Hide loading modal even on error
    });
}
