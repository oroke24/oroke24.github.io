function createImageBox(divId = 'imageBox'){
	const box = document.createElement('div');
	box.display = 'flex';
	box.className = 'justify-content-center align-items-center';
	box.width = '100%';
	box.height = 'max-content';
	box.style.minHeight = '200px';
	box.style.margin = '10px';
	box.style.padding = '5px';
	box.style.border = '1px solid black';
	box.id = divId;
	//console.log("box: ", box);
	return box;
}

function createSmallImageBox(divId = 'smallImageBox'){
	const box = document.createElement('div');
	box.display = 'flex';
	box.className = 'justify-content-center item';
	box.width = 'max-content';
	box.height = 'max-content';
	box.style.border = '1px solid red';
	box.id = divId;
	//console.log("smallbox: ", box);
	return box;
}