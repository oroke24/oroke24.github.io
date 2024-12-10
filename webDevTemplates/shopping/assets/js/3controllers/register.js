// Step 1: Get elements
const registerButton = document.getElementById('submitRegister');
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const submit = document.getElementById('submit');
const errorRegisterMessage = document.getElementById('errorRegisterMessage');
const emailInput = document.getElementById('email');
const newPasswordInput = document.getElementById('newPassword');
const correctPasswordInput = document.getElementById('correctPassword');
const backButton = document.getElementById('backButton');

//Backbutton
backButton.addEventListener('click', function(){
    registerModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

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
    }else{
        window.authorizationManager.register(username, password);
        errorRegisterMessage.textContent = ''; // Clear the error message
    }
});
