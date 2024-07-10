    //Get submit form
    document.querySelector("#btn").addEventListener("click", (e) => {
        //prevent default browser behavior
        e.preventDefault();
        let date = document.querySelector("#date").value
        let firstname = document.querySelector("#firstName").value
        let lastname = document.querySelector("#lastName").value
        let email = document.querySelector("#email").value
        let phone = document.querySelector("#phone").value
        let address = document.querySelector("#city").value
        let description = document.querySelector("#description").value
        //test
        alert(date + "\n" + firstname + " " + lastname + "\n" + phone + "\n" +
            email + "\n" + address + "\n" + description);
    });
