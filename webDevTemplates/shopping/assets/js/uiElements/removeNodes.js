function removeNodes(...args){
	args.forEach(node =>{
		node.remove();
	});
}