function horizontalScroll(divId, items){
	try{
		 if (!Array.isArray(items) || items.length === 0) {
            console.error("Items array is invalid or empty");
            return null; // Early exit if items is not a valid array
        }
		//console.log(`divId: ${divId}, items: ${items}`);
		const scrollContainer = document.createElement('div');
		scrollContainer.id = divId;
		scrollContainer.classList.add('horizontal-scroll-container');
		for(let i = 0; i < items.length; i++){
			const box = namePriceBox(items[i].name, items[i].price);//document.createElement('div');

			const isAdmin = window.authorizationManager.checkAdminStatus(localStorage.getItem('userUID'));
			if(isAdmin) box.addEventListener('click', ()=> { editItem(items[i], divId, 4) });
			else box.addEventListener('click', ()=> { viewItem(items[i]) });
			scrollContainer.appendChild(box);
		}
		return scrollContainer;
	}catch(e){
		console.log("error in horizontalScroll", e);
	}
}