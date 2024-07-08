console.log("opening test.js");
const form = document.getElementById("book_now-form");
const firstName = document.getElementById("firstName");
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();
    db.collection('').doc().set({
        firstName: firstName.value
    }).then(() => {
        book_now-form.reset();
        con
    })
});