function checkAdminStatus(uid){
	return db.collection('adminList').where("uid", "==", uid).get()
	.then(snapshot =>{
		if(snapshot.empty) return false; //is not an admin
		else return true;  //is an admin
	})
	.catch(error =>{
		console.error("Error in checkAdminStatus: ", error);
	});
}