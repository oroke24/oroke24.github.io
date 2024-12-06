function dropDownArea(){
	// Create the dropdown menu (div) that will contain child divs
	 const menu = document.createElement('div');
	 menu.classList.add('dropdown-menu', 'w-100');
	 menu.setAttribute('aria-labelledby', 'dropdownMenuButton');
	 
	 return menu;
}