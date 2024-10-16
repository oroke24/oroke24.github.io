let formDataArray = [];
let pastDataArray = [];
const today = new Date();
let year = today.getFullYear().toString();
let month = ((today.getMonth() + 1).toString().length == 1) ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
let day = today.getDate().toString();
let todayFormatted = year + "-" + month + "-" + day;
//console.log("todayFormatted: ", todayFormatted);

// Function to fetch data from Firestore and populate the array
function fetchData() {
    db.collection('jobs').get()
        .then(snapshot => {
            formDataArray = [];
            pastDataArray = [];
            snapshot.forEach(doc => {
                if (doc.data().date >= todayFormatted) {
                    formDataArray.push({
                        id: doc.id, // Store the document ID
                        ...doc.data()
                    });
                }
                else {
                    pastDataArray.unshift({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
            renderThisData();
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
            alert("Error fetching data. Please try again.");
        });
}
function renderThisData() {
    let dataContainer = document.getElementById('jobContainer');
    let pastContainer = document.getElementById('pastContainer')
    renderData(formDataArray, dataContainer); 
    renderData(pastDataArray, pastContainer); 
}
// Call fetchData initially to load data on page load
fetchData();