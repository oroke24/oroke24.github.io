/*HTML USE CASE EXAMPLE

<!-- Button to Open the Modal -->
<button id="loginButton">Login</button>

<!-- The Modal -->
<div id="loginModal">
    <div id="loginContainer">
        <span class="close" id="closeModal">&times;</span>
        <h2>Login</h2>
        <label for="email">email:</label>
        <input type="text" id="email" placeholder="Enter email">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password">
        <input type="password" id="password" placeholder="Enter password">
        <button id="submitLogin">Login</button>
        <div class="error" id="errorMessage"></div>
    </div>
</div>

END USE CASE EXAMPLE*/

//step 0: on startup check for user
const uid = localStorage.getItem('userUID');
if(uid) logoutButton.style.display = 'inline-block';


// Step 1: Get elements
const loginButton = document.getElementById('userButton');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeLoginModal');
const submitLogin = document.getElementById('submitLogin');
const errorMessage = document.getElementById('errorLoginMessage');
const emailLoginInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('password');
const startRegistrationButton = document.getElementById('submitRegister');
const resendVerificationButton = document.getElementById('resendVerificationButton');

// Step 2: Handle userbutton clicked logic
loginButton.addEventListener('click', async function() {
    const uid = localStorage.getItem('userUID');
    //console.log("uid: ", uid);
    if(uid){
        //already logged in
        const isAdmin = await checkAdminStatus(uid);
        console.log("isAdmin = ", isAdmin);
        if(isAdmin) window.location.href = 'admin/index.html'; //send to admin page
        else window.location.href = 'profile.html'; //send to profile page
    }
    else{
        //proceed to login
        loginModal.style.display = 'flex';
		resendVerificationButton.style.display = 'none';
		errorMessage.textContent = '';
    }
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
        
    const email = emailLoginInput.value;
    const password = passwordInput.value;

    // Simple validation
    if (email === '' || password === '') {
        errorMessage.textContent = 'Please fill in both fields.';
    }else{
        login(email, password)
        .then((success) => {
            if(success){
                errorMessage.textContent = '';
                //alert('Login successful!');
                console.log("login successful");
                loginModal.style.display = 'none';
                window.location.href = 'index.html';
            }else{
                //errorMessage.textContent = 'Try again';

            }
        })
        .catch((error) => {
            errorMessage.textContent = 'An error occurred during login.';
            console.error("Error during login:", error);
        })
    }
});
//Step 6: handle registration 
submitRegister.addEventListener('click', function(event){
    event.preventDefault();// prevent the form from submitting
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
    
});

//Step 7: handle resend link option
resendVerificationButton.addEventListener('click', function() {
    const user = firebase.auth().currentUser; // Get the current logged-in user
    
    if (user) {
        // Send a new verification email
        user.sendEmailVerification()
        .then(() => {
            alert('A new verification email has been sent. Please check your inbox!');
            console.log('Verification email resent.');
        })
        .catch((error) => {
            console.error('Error resending verification email: ', error);
            alert('An error occurred while sending the verification email.');
        });
    }
});
