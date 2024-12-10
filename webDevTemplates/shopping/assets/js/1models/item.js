class Item{
	constructor(id = "", name = "", description = "", price = 0, quantity = 0, createdOn = "", isActive = false, quantitySold = 0, images=[1, 2, 3]){
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.createdOn = createdOn;
		this.isActive = isActive;
		this.quantitySold = quantitySold;
		this.images = images;
	}
	display(listType){
		if(listType == 0) return this.jsonObject(); //JSONObject
		else if(listType == 1) return this.quickDisplay();
		else if(listType == 2) return this.displayNameAndDate();
		else if(listType == 3) return this.displayNameDateActiveSold();
		else return  this.myNamePriceBox();
	}
	displayInfo() {
		const thisDiv = document.createElement('div');
        thisDiv.textContent =  `name: ${this.name}, description: ${this.description}, price: ${this.price}, quantity: ${this.quantity}, createdOn: ${this.createdOn}, isActive: ${this.isActive}`;
		return thisDiv;
    }
	quickDisplay() {
		const thisDiv = document.createElement('div');
        thisDiv.textContent =  `${this.name}, $${this.price} (${this.quantity} left)`;
		return thisDiv;
    }
	displayNameAndDate() {
		const thisDiv = document.createElement('div');
        thisDiv.textContent = `name: ${this.name},  as of ${this.createdOn}`;
		return thisDiv;
    }
	displayNameDateActive() {
		const thisDiv = document.createElement('div');
		let active = "Not Actively Selling";
		if(this.isActive) active = "Currently For Sale"
		thisDiv.textContent = `${this.name}, ${this.createdOn}, ${active}`;
		return thisDiv;
    }
	displayNameDateActiveSold(){
		const thisDiv = document.createElement('div');
		let active = "Not Actively Selling";
		if(this.isActive) active = "Currently For Sale"
        thisDiv.textContent = `${this.name}, ${this.createdOn}, ${active}, ${this.quantitySold} sold`;
		return thisDiv;
	}
	myNamePriceBox(){
		return namePriceBox(this.name, this.price);
	}

	
	jsonObject() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			price: this.price,
			quantity: this.quantity,
			createdOn: this.createdOn,
			isActive: this.isActive,
			quantitySold: this.quantitySold
		}
	}

	quantitySold() {
		return this.quantitySold;
	}
}
