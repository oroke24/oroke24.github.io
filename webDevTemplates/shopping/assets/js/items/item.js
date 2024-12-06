class Item{
	constructor(name = "name", description = "description", price = 0, quantity = 0, createdOn = "date", isActive = true){
		this.name = name;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.createdOn = createdOn;
		this.isActive = isActive;
	}
	displayInfo() {
		console.log("name: ", this.name);
        return `name: ${this.name}, description: ${this.description}, price: ${this.price}, quantity: ${this.quantity}, createdOn: ${this.createdOn}, isActive: ${this.isActive}`;
    }
	jsonObject() {
    return {
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        createdOn: this.createdOn,
        isActive: this.isActive
    };
}

}