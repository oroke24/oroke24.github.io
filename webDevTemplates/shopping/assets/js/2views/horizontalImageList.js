function horizontalImageList(divId = 'imageList', item){
	const horizontalList = document.createElement('div');
	horizontalList.className = 'horizontal-scroll-container';
	item.images.forEach(imageUrl =>{
		//console.log("in horizontalImagList, imageUrl:", imageUrl);
		const smallImageContainer = createSmallImageBox(item.id +'/'+ imageUrl);
		console.log('in horizontalImageList, imageUrl:', imageUrl);
		populateImage(imageUrl, smallImageContainer);
		horizontalList.appendChild(smallImageContainer);
	});
	return horizontalList;
}