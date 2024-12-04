/*HTML USE CASE EXAMPLE

<!-- Button to Open the Modal -->
<button id="registerButton">register</button>

<!-- The Modal -->
<div id="registerModal">
    <div id="registerContainer">
        <span class="close" id="closeModal">&times;</span>
        <h2>register</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password">
        <button id="submit>register</button>
        <div class="error" id="errorMessage"></div>
    </div>
</div>

END USE CASE EXAMPLE*/


// Step 1: Get elements
const registerButton = document.getElementById('submitRegister');
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const submit = document.getElementById('submit');
const errorRegisterMessage = document.getElementById('errorRegisterMessage');
const emailInput = document.getElementById('email');
const newPasswordInput = document.getElementById('newPassword');
const correctPasswordInput = document.getElementById('correctPassword');

// Step 2: Open the modal
registerButton.addEventListener('click', function() {
    registerModal.style.display = 'flex';
});

// Step 3: Close the modal when the user clicks the close button
closeRegisterModal.addEventListener('click', function() {
    registerModal.style.display = 'none';
});

// Step 4: Close the modal if the user clicks outside the modal container
window.addEventListener('click', function(event) {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Step 5: Handle form submission
submit.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting
        
    const username = emailInput.value;
    const password = newPasswordInput.value;
    const checkPass = correctPassword.value;

    // Simple validation
    if(username === '' || password === ''){
        errorRegisterMessage.textContent = 'Fields cannot be blank'    
    }else if (checkPass != password) {
        errorRegisterMessage.textContent = 'passwords must match.';
    }else if(!register(username, password)) {
        errorRegisterMessage.textContent = 'Error adding user.';
    }else{
        errorRegisterMessage.textContent = ''; // Clear the error message
        alert('register successful!');
		console.log("register successful");
        registerModal.style.display = 'none'; // Close the modal on success
    }
});
