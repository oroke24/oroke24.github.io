function createButton(name){
	const button = document.createElement('button');
	button.classList.add('btn-success');
	button.style.margin = "5px";
	button.textContent = name;
	return button;
}
