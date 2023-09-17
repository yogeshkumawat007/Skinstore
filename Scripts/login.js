document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("loginForm");

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        //get the values
        const savedEmail = localStorage.getItem('email');
        const savedPassword =localStorage.getItem('password');

        if (email != savedEmail) {
            alert("Email not registered!");
            return;
        }

        if (password !== savedPassword) {
            alert("Wrong Password!");
            return;
        }

        // Reset the form
        registrationForm.reset();
    });
});