/*HTML USE CASE EXAMPLE

<!-- Button to Open the Modal -->
<button id="loginButton">Login</button>

<!-- The Modal -->
<div id="loginModal">
    <div id="loginContainer">
        <span class="close" id="closeModal">&times;</span>
        <h2>Login</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password">
        <button id="submitLogin">Login</button>
        <div class="error" id="errorMessage"></div>
    </div>
</div>

END USE CASE EXAMPLE*/


// Step 1: Get elements
const loginButton = document.getElementById('userButton');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeLoginModal');
const submitLogin = document.getElementById('submitLogin');
const errorMessage = document.getElementById('errorLoginMessage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const startRegistrationButton = document.getElementById('submitRegister');

// Step 2: Open the modal
loginButton.addEventListener('click', function() {
    loginModal.style.display = 'flex';
});

// Step 3: Close the modal when the user clicks the close button
closeModal.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

// Step 4: Close the modal if the user clicks outside the modal container
window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Step 5: Handle form submission
submitLogin.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting
        
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Simple validation
    if (username === '' || password === '') {
        errorMessage.textContent = 'Please fill in both fields.';
    }else if(!login(username, password)) {
        errorMessage.textContent = 'User not found.';
    }else{
        errorMessage.textContent = ''; // Clear the error message
        alert('Login successful!');
		console.log("login successful");
        loginModal.style.display = 'none'; // Close the modal on success
    }
});
submitRegister.addEventListener('click', function(event){
    event.preventDefault();// prevent the form from submitting
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
    
});
