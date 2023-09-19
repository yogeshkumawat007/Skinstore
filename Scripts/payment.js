let singleProArr = [
  {
    id: "555",
    image_urls: [
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12588508-9214904684566827.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12588508-1294904684596665.jpg",
    ],
    name: "111SKIN Sub-Zero De-Puffing Energy Facial Mask Box",
    brand: "111SKIN",
    skin_type: "Acne Prone",
    product_type: "skinCare",
    price: "135.00",
    description:
      "111SKIN Sub-Zero De-Puffing Energy Mask provides a cooling and energizing experience for the skin.",
    reviews: {
      average_rating: 4.5,
      total_reviews: 60,
    },
  },

  {
    id: "777",
    image_urls: [
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14514328-3975064449442396.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14514328-1095064448920540.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/14514328-1305064449176521.jpg",
    ],
    name: "Elemis Limited Edition Pro-Collagen Marine Cream SPF 30 100ml (Worth $239)",
    brand: "Elemis",
    skin_type: "Acne Prone",
    product_type: "skinCare",
    price: "220.00",
    description:
      "Elemis Pro-Collagen Marine Cream is a luxurious anti-aging cream with SPF 30 for firmer, smoother skin.",
    reviews: {
      average_rating: 4.9,
      total_reviews: 39,
    },
  },
  {
    id: "111",
    image_urls: [
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11814869-2065062272653937.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11814869-3714864714301856.jpg",
    ],
    name: "Colorescience Sunforgettable Total Protection Face Shield SPF50 (PA++++) 55ml",
    brand: "Colorescience",
    skin_type: "Combination",
    product_type: "skinCare",
    price: "45.00",
    description:
      "Colorescience Sunforgettable Face Shield offers total protection with SPF50 against harmful UV rays.",
    reviews: {
      average_rating: 4.2,
      total_reviews: 56,
    },
  },
  {
    id: "555",
    image_urls: [
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11382032-1305023392875862.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11382032-9424901840301822.jpg",
    ],
    name: "The Ordinary Azelaic Acid Suspension 10% 30ml",
    brand: "The Ordinary",
    skin_type: "Mature",
    product_type: "skinCare",
    price: "11.10",
    description:
      "The Ordinary Azelaic Acid Suspension 10% is a multifunctional skincare product that targets various skin concerns.",
    reviews: {
      average_rating: 4.1,
      total_reviews: 24,
    },
  },
];
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
