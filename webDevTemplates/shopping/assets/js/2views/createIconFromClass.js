function createIconFromClass(...args){
	const icon = document.createElement('i');
		args.forEach (arg =>{
			icon.classList.add(arg);
			//console.log("in createIconFromClass: i of classes:", i);
		});
	return icon;
}