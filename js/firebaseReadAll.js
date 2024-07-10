//Be sure to check collection path and name in firestore
db.collection('jobs').get()
      .then(snapshot => {
        let data = '';
        snapshot.forEach(doc => {
          data += `<p>
            <b>Date:</b> ${doc.data().date}<br>
            <b>First Name:</b> ${doc.data().firstName}<br>
            <b>Last Name:</b> ${doc.data().lastName}<br>
            <b>Email:</b> ${doc.data().email}<br>
            <b>Phone:</b> ${doc.data().phone}<br>
            <b>Address:</b> ${doc.data().address}<br>
            <b>Description:</b> ${doc.data().description}<br>
          </p>`;
        });
        document.getElementById('jobContainer').innerHTML = data;
      })
      .catch(error => {
        console.error("Error getting documents: ", error);
        document.getElementById('jobContainer').innerHTML = 'Error fetching data. Please try again.';
      });