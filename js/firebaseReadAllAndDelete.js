let formDataArray = [];

// Function to fetch data from Firestore and populate the array
function fetchData() {
    db.collection('jobs').get()
        .then(snapshot => {
            formDataArray = [];
            snapshot.forEach(doc => {
                formDataArray.push({
                    id: doc.id, // Store the document ID
                    ...doc.data()
                });
            });
            renderData();
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
            alert("Error fetching data. Please try again.");
        });
}

// Function to render data in the HTML
function renderData() {
    let dataContainer = document.getElementById('jobContainer');
    dataContainer.innerHTML = ''; // Clear previous content

    formDataArray.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerHTML = `
          <p>
            <b>Date:</b> ${item.date}<br>
            <b>First Name:</b> ${item.firstName}<br>
            <b>Last Name:</b> ${item.lastName}<br>
            <b>Email:</b> ${item.email}<br>
            <b>Phone:</b> ${item.phone}<br>
            <b>Address:</b> ${item.address}<br>
            <b>Description:</b> ${item.description}<br>
          </p>
          <button onclick="deleteData('${item.id}')">Delete</button>
        `;
        dataContainer.appendChild(itemElement);
    });
}

// Function to delete data from Firestore
function deleteData(id) {
    if (confirm('Are you sure you want to delete this data?')) {
        db.collection('formData').doc(id).delete()
            .then(() => {
                fetchData(); // Update the array and re-render
            })
            .catch(error => {
                console.error("Error deleting document: ", error);
                alert("Error deleting data. Please try again.");
            });
    }
}

// Call fetchData initially to load data on page load
fetchData();