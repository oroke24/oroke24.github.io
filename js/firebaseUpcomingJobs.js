let formDataArray = [];
const today = new Date();
/*TESTING 
console.log("today = new Date() = : ", today);
console.log("year: ",today.getFullYear().toString());
console.log("month: ",(today.getMonth()+1).toString());
console.log("day: ",today.getDate().toString());
*/
let year = today.getFullYear().toString();
let month = ((today.getMonth() + 1).toString().length == 1) ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString(); 
let day = today.getDate().toString();
let todayFormatted = year + "-" + month + "-" + day;
console.log("todayFormatted: ",todayFormatted);

// Function to fetch data from Firestore and populate the array
function fetchData() {
    db.collection('jobs').get()
        .then(snapshot => {
            formDataArray = [];
            snapshot.forEach(doc => {
                console.log("date: ", doc.data().date)
                if (doc.data().date >= todayFormatted) {
                    formDataArray.push({
                        id: doc.id, // Store the document ID
                        ...doc.data()
                    });
                }
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
            <button onclick="deleteData('${item.id}')">Delete</button>
          </p>
        `;
        dataContainer.appendChild(itemElement);
    });
}

// Function to delete data from Firestore
function deleteData(id) {
    if (confirm('Are you sure you want to delete this data?')) {
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

// Call fetchData initially to load data on page load
fetchData();