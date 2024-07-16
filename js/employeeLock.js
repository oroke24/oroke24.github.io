async function openPageWithMasterPassword(pathString) {
    let userEnteredPassword = prompt("Please enter admin password:");
    let storedMasterPassword = await findMyKey("employeeKey");
    if (userEnteredPassword === storedMasterPassword) {
        // Proceed
        window.location.href = pathString;
    } else {
        // Incorrect password
        alert("Incorrect master password. Action cancelled.");
    }
}