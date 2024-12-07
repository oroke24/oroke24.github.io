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
		//console.log("name: ", this.name);
        return `name: ${this.name}, description: ${this.description}, price: ${this.price}, quantity: ${this.quantity}, createdOn: ${this.createdOn}, isActive: ${this.isActive}`;
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