function openPageWithMasterPassword(pathString) {
    let userEnteredPassword = prompt("Please enter admin password:");
    // Todo: store master password somewhere else
    let storedMasterPassword = "Drinkcoffee";
    if (userEnteredPassword === storedMasterPassword) {
        // Proceed
        window.location.href = pathString;
    } else {
        // Incorrect password
        alert("Incorrect master password. Action cancelled.");
    }
}