function deleteWithMasterPassword(id) {
    let userEnteredPassword = prompt("Please enter your master password:");
    // Should be moved eventually
    let storedMasterPassword = "mySecretPassword";
    if (userEnteredPassword === storedMasterPassword) {
        deleteData(id);
    } else {
        alert("Incorrect master password. Deletion canceled.");
    }
}

function deleteData(id) {
    if (confirm('Are you sure you want to delete this job?')) {
        db.collection('jobs').doc(id).delete()
            .then(() => {
                fetchData(); // Update the array and re-render
            })
            .catch(error => {
                console.error("Error deleting document: ", error);
                alert("Error deleting data. Please try again.");
            });
    }
}