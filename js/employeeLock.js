function openPageWithMasterPassword(pathString) {
    // Prompt the user for their master password
    let userEnteredPassword = prompt("Please enter admin password:");
    // Assuming you have a stored master password
    let storedMasterPassword = "drinkcoffee";
    // Check if the entered password matches the stored master password
    if (userEnteredPassword === storedMasterPassword) {
        // Proceed
        window.location.href = pathString;
    } else {
        // Incorrect password
        alert("Incorrect master password. Action cancelled.");
    }
}