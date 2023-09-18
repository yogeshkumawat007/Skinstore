document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get the array of users
    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    // Find the user with the matching email
    let user = usersArray.find((user) => user.email === email);

    if (!user) {
      alert("Email not registered!");
      return;
    }

    // Check if the password is correct
    if (user.password !== password) {
      alert("Wrong password!");
      return;
    }

    // Store the logged in user's details
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to index.html
    window.location.href = "index.html";
  });
});
