//////HTML Binding/////////////
document.querySelector("#btn").addEventListener("click", (e) => {
    e.preventDefault();   //prevent default browser behavior
    let date = document.querySelector("#date").value
    let firstName = document.querySelector("#firstName").value
    let lastName = document.querySelector("#lastName").value
    let email = document.querySelector("#email").value
    let phone = document.querySelector("#phone").value
    let address = document.querySelector("#city").value
    let description = document.querySelector("#description").value
    const formData = {   //constructing JSON object
        date: date,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        description: description
    };
    // Test connection
    db.collection('jobs').add(formData)
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            alert('Firestore connection successful!');
            location.reload();
        })
        .catch(error => {
            console.error("Error adding document: ", error);
            alert('Firestore connection failed!');
        });
});

