function namePriceBox(aName, aPrice){
	const box = document.createElement('div');
	const name = document.createElement('div');
	const price = document.createElement('div');
	
	box.className = 'box item';

	name.style.overflow = 'hidden';
	name.textContent = aName;
	price.textContent = aPrice;

	box.appendChild(name);
	box.appendChild(price);

	return box;
}