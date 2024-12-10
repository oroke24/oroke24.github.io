function createImageUploadButton(divId = 'imageUploadButton'){
	const input = document.createElement('input');
	input.type = 'file';
	input.id = divId;
	input.accept = 'image/*';
	return input;
}