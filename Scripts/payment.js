var urlParams = new URLSearchParams(window.location.search);
var singleProArr = JSON.parse(decodeURIComponent(urlParams.get("data"))) || [];
console.log(singleProArr);

// console.log(singleProArr);

let countItem = 0;
let checkoutRightAddDiv = document.getElementById("checkoutRightAddDiv");

// total Price
let totalPrice = 0;

singleProArr.forEach(function (ele) {
  // console.log("elefromPaymentPage:", ele);

  countItem++;
  totalPrice += +ele.price;

  let mainDivAppend = document.createElement("div");
  mainDivAppend.setAttribute("id", "mainDivAppend");

  let divFrist = document.createElement("div");
  divFrist.setAttribute("id", "divFrist");
  let divSecond = document.createElement("div");
  divSecond.setAttribute("id", "divSecond");

  let image = document.createElement("img");
  // image.scr = ele.image_urls[0];
  image.setAttribute("src", ele.image_urls[0]);
  // console.log(image.scr)
  divFrist.append(image);

  // adding elements in second div
  let name = document.createElement("p");
  name.innerText = ele.name;

  let quantity = document.createElement("p");
  quantity.innerText = `Quantity: ${1}`; // add quantity data from localStorage;

  let price = document.createElement("p");
  price.innerText = `$ ${ele.price}`;

  divSecond.append(name, quantity, price);

  mainDivAppend.append(divFrist, divSecond);
  checkoutRightAddDiv.append(mainDivAppend);
});

document.getElementById("countItem").innerHTML = `${countItem} Items`;

document.getElementById("totalToPay").innerHTML = `$ ${totalPrice}`;

// adding Delivery charge function

document
  .getElementById("standardDelivery")
  .addEventListener("click", standardDeliveryFun);

document
  .getElementById("twoDayDelivery")
  .addEventListener("click", twoDayDeliveryFun);
document
  .getElementById("oneDayDelivery")
  .addEventListener("click", oneDayDeliveryFun);

function standardDeliveryFun() {
  clickDiv = 1;
  console.log("standardDeliveryFun", clickDiv);
  document.getElementById("totalToPay").innerHTML = `$ ${totalPrice}`;
  document.getElementById("standardDeliverySpan").innerHTML = "Free";

  document.getElementById("standardDelivery").style.border = "3px solid green";
  document.getElementById("oneDayDelivery").style.border = "1px solid #333333";
  document.getElementById("twoDayDelivery").style.border = "1px solid #333333";
}

function twoDayDeliveryFun() {
  console.log("twoDayDeliveryFun", clickDiv);
  document.getElementById("totalToPay").innerHTML = `$ ${totalPrice + 10}`;
  document.getElementById("standardDeliverySpan").innerHTML = "Two Days";

  document.getElementById("twoDayDelivery").style.border = "3px solid green";
  document.getElementById("standardDelivery").style.border =
    "1px solid #333333";
  document.getElementById("oneDayDelivery").style.border = "1px solid #333333";
}

function oneDayDeliveryFun() {
  // clickDiv = 3;
  console.log("oneDayDeliveryFun", clickDiv);
  document.getElementById("totalToPay").innerHTML = `$ ${totalPrice + 20}`;
  document.getElementById("standardDeliverySpan").innerHTML = "One Day";

  document.getElementById("oneDayDelivery").style.border = "3px solid green";
  document.getElementById("standardDelivery").style.border =
    "1px solid #333333";
  document.getElementById("twoDayDelivery").style.border = "1px solid #333333";
}

// adding logic for checkbox

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Add an event listener to the checkboxes
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    if (index !== 0) {
      // Uncheck all other checkboxes except the first one (checkboxes[0])
      checkboxes.forEach((otherCheckbox, otherIndex) => {
        if (otherIndex !== index) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});
