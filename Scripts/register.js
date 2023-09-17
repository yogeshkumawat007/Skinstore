document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const confirmEmail = document.getElementById("confirmEmail").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const fullName = document.getElementById("fullname");

        if (email !== confirmEmail) {
            alert("Emails do not match!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const savedEmail = localStorage.getItem('email');
        if (email == savedEmail) {
            alert("Email already registered!");
            return;
        }

        //save the values
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('fullName', fullName);

        // Reset the form
        registrationForm.reset();
    });
});