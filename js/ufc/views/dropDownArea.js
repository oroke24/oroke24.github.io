function dropDownArea(){
	// Create the dropdown area (div) that will contain child divs
	 const area = document.createElement('div');
	 area.classList.add('dropdown-area');
	 //area.setAttribute('aria-labelledby', 'dropdownareaButton');
	 
	 return area;
}
function dropDownArea(name){
	// Create the dropdown area (div) that will contain child divs
	 const area = document.createElement('div');
	 area.id = name;
	 area.classList.add('dropdown-area', 'w-100');
	 //area.setAttribute('aria-labelledby', 'dropdownareaButton');
	 
	 return area;
}