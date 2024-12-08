function horizontalScroll(divId, items){
	try{
		console.log(`divId: ${divId}, items: ${items}`);
		const scrollContainer = document.createElement('div');
		scrollContainer.id = divId;
		scrollContainer.classList.add('horizontal-scroll-container');
		for(let i = 0; i < items.length; i++){
			const box = document.createElement('div');
			box.className = "box item";
			//console.log(`item name: ${items[i].name}`);

			// Create name element
            const nameElement = document.createElement('div');
            nameElement.textContent = items[i].name;
            // Create price element
            const priceElement = document.createElement('div');
            priceElement.textContent = `$${items[i].price}`;
            // Append name and price to the box

            box.appendChild(nameElement);
            box.appendChild(priceElement);

			box.addEventListener('click', ()=> { viewItem(items[i]) });
			scrollContainer.appendChild(box);
		}
		return scrollContainer;
	}catch(e){
		console.log("error in horizontalScroll", e);
	}
}