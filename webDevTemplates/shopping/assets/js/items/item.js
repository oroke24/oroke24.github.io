class Item{
	constructor(id = "", name = "", description = "", price = 0, quantity = 0, createdOn = "", isActive = false){
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.createdOn = createdOn;
		this.isActive = isActive;
	}
	displayInfo() {
        return `name: ${this.name}, description: ${this.description}, price: ${this.price}, quantity: ${this.quantity}, createdOn: ${this.createdOn}, isActive: ${this.isActive}`;
    }
	displayNameAndDate() {
        return `name: ${this.name},  as of ${this.createdOn}`;
    }
	displayNameDateActive() {
		let active = "Not Actively Selling";
		if(this.isActive) active = "Currently For Sale"
        return `name: ${this.name}, ${this.createdOn}, ${active}`;
    }
	
	jsonObject() {
    return {
		id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        createdOn: this.createdOn,
        isActive: this.isActive
    };
}

}