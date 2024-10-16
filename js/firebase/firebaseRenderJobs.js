function renderData(formDataArray, dataContainer) {
    dataContainer.innerHTML = ''; // Clear previous content

    formDataArray.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerHTML = `
          <p class="dotted-border marg-pad">
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