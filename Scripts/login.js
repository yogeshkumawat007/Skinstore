document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const alertElement = document.getElementById("alert");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alertElement.textContent = "";
    alertElement.style.display = "none";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    let user = usersArray.find((user) => user.email === email);

    if (!user) {
      alertElement.textContent = "Email not registered!";
      alertElement.style.display = "block";
      return;
    }

    if (user.password !== password) {
      alertElement.textContent = "Wrong password!";
      alertElement.style.display = "block";
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "index.html";
  });
});
