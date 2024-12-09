function deleteItem(id) {
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