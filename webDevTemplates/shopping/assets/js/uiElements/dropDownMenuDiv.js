function dropDownDiv() {
    // Create the dropdown div element
    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown');
    
    // Create the button element for the dropdown toggle
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
    button.type = 'button';
    button.id = 'dropdownMenuButton';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Dropdown button';
    
    // Create the dropdown menu (ul)
    const menu = document.createElement('ul');
    menu.classList.add('dropdown-menu');
    menu.setAttribute('aria-labelledby', 'dropdownMenuButton');
    
    // Create the dropdown menu items (li elements)
    const item1 = document.createElement('li');
    const link1 = document.createElement('a');
    link1.classList.add('dropdown-item');
    link1.href = '#';
    link1.textContent = 'Action';
    item1.appendChild(link1);
    
    const item2 = document.createElement('li');
    const link2 = document.createElement('a');
    link2.classList.add('dropdown-item');
    link2.href = '#';
    link2.textContent = 'Another action';
    item2.appendChild(link2);
    
    const item3 = document.createElement('li');
    const link3 = document.createElement('a');
    link3.classList.add('dropdown-item');
    link3.href = '#';
    link3.textContent = 'Something else here';
    item3.appendChild(link3);
    
    // Append items to the menu
    menu.appendChild(item1);
    menu.appendChild(item2);
    menu.appendChild(item3);
    
    // Append the button and menu to the dropdown container
    dropdownDiv.appendChild(button);
    dropdownDiv.appendChild(menu);
    
    // Return the dropdown node
    return dropdownDiv;
}

