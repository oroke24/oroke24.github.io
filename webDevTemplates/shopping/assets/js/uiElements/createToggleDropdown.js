function createToggleDropdown(name) {
    // Create the dropdown div element
    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown', 'w-100');
    
    // Create the button element for the dropdown toggle
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-100');
    button.type = 'button';
    button.id = 'dropdownToggleButton';
    button.setAttribute('aria-expanded', 'false');
    button.textContent = name;

    // Append the button and menu to the dropdown container
    dropdownDiv.appendChild(button);
    
    // Return the dropdown node
    return dropdownDiv;
}
