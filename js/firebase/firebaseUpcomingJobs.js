let formDataArray = [];
const today = new Date();
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
            let dataContainer = document.getElementById('jobContainer');
            renderData(formDataArray, dataContainer);
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
            alert("Error fetching data. Please try again.");
        });
}

// Call fetchData initially to load data on page load
fetchData();