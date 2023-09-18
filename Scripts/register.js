document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullname").value;
    const phoneNumberElement = document.getElementById("phoneNumber");
    let phoneNumber = phoneNumberElement ? phoneNumberElement.value : null;

    if (email !== confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^(?=.*\d).{6,}$/.test(password)) {
      alert(
        "Password must contain a minimum of 6 characters and at least 1 number!"
      );
      return;
    }

    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    let userExists = usersArray.some((user) => user.email === email);

    if (userExists) {
      alert("Email already registered!");
      return;
    }

    let user = {
      email: email,
      password: password,
      fullName: fullName,
      phoneNumber: phoneNumber,
    };

    usersArray.push(user);
    localStorage.setItem("usersArray", JSON.stringify(usersArray));

    registrationForm.reset();
    window.location.href = "login.html";
  });
});
