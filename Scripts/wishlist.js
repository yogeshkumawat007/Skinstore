var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];

function renderProductCards(data) {
  var parentDiv = document.querySelector("#productCatelog");
  parentDiv.innerHTML = "";
  data.forEach(function (element, index) {
    var image_url = element.image_urls[0];
    var name = element.name;
    var price = element.price;

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "productCardDiv");
    var imageAndRemoveDiv = document.createElement("div");
    imageAndRemoveDiv.setAttribute("id", "imageAndRemoveDiv");
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("id", "imageDiv");
    var removeDiv = document.createElement("div");
    removeDiv.setAttribute("id", "removeDiv");
    var image = document.createElement("img");
    var removeIcon = document.createElement("i");
    removeIcon.className = "fa-regular fa-circle-xmark";
    removeIcon.style.color = "#383535";

    var productDetailsDiv = document.createElement("div");
    productDetailsDiv.setAttribute("id", "productDetailsDiv");

    var proName = document.createElement("h3");
    proName.innerHTML = name;

    // Price element

    var priceElement = document.createElement("p");
    priceElement.setAttribute("id", "priceElement");
    priceElement.innerHTML = `$${price}`;

    productDetailsDiv.append(proName, priceElement);

    image.src = image_url;
    imageDiv.append(image);
    removeDiv.append(removeIcon);
    imageAndRemoveDiv.append(imageDiv, removeDiv);
    var addToCartButton = document.createElement("button");

    addToCartButton.innerHTML = "ADD TO CART";
    addToCartButton.setAttribute("id", "addToCartButton");

    cardDiv.append(imageAndRemoveDiv, productDetailsDiv, addToCartButton);

    image.addEventListener("mouseover", function () {
      if (element.image_urls.length > 1) {
        image.style.transition = "all 0.5s ease";
        image.src = element.image_urls[1];
      }
    });

    image.addEventListener("mouseout", function () {
      image.style.transition = "all 0.5s ease";
      image.src = element.image_urls[0];
    });

    removeIcon.addEventListener("click", function () {
      let index = wishlistData.indexOf(element);

      wishlistData.splice(index, 1);
      localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
      renderProductCards(wishlistData);
      updateData();
    });

    addToCartButton.addEventListener("click", function () {
      let index = wishlistData.indexOf(element);

      cartData.push(element);
      localStorage.setItem("cartData", JSON.stringify(cartData));

      // Remove from wishlist
      wishlistData.splice(index, 1);
      localStorage.setItem("wishlistData", JSON.stringify(wishlistData));

      renderProductCards(wishlistData);
      updateData();
      openPopup();
      renderPopupData(element);
    });

    var parentDiv = document.querySelector("#productCatelog");
    parentDiv.append(cardDiv);
  });
}

var sortingElement = document.querySelector("#sortProduct");

var originalData = [...wishlistData];

sortingElement.addEventListener("change", function () {
  var value = this.value;
  var sortedData;

  switch (value) {
    case "popularity":
      sortedData = [...wishlistData].sort((a, b) => b.id - a.id);
      break;
    case "proceLtH":
      sortedData = [...wishlistData].sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
      );
      break;
    case "prieHtL":
      sortedData = [...wishlistData].sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
      );
      break;
    case "AtZ":
      sortedData = [...wishlistData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      sortedData = originalData;
  }

  var parentDiv = document.querySelector("#productCatelog");
  parentDiv.innerHTML = "";

  renderProductCards(sortedData);
  updateData();
});

function updateData() {
  var updateItems = document.querySelector("#totalNoOfProducts");

  updateItems.innerHTML = `${wishlistData.length} item(s)`;
}

// Popup

let popup = document.querySelector("#popup");

let closePopupButton = document.querySelector("#closePopupButton");
closePopupButton.addEventListener("click", closePopup);

let viewCartBtn = document.querySelector(".fa-x");
viewCartBtn.addEventListener("click", closePopup);

var backdrop = document.getElementById("backdrop");

function openPopup() {
  popup.classList.add("open-popup");
  backdrop.classList.add("open-backdrop");
}

function closePopup() {
  popup.classList.remove("open-popup");
  backdrop.classList.remove("open-backdrop");
}

renderProductCards(cartData);

function renderPopupData(element) {
  let popupProductName = document.querySelector("#popupProductName");
  let popupProductPrice = document.querySelector("#popupProductPrice");
  let popupProductSubtotal = document.querySelector("#popupProductSubtotal");
  let noOfItemsInCart = document.querySelector("#noOfItemsInCart");

  let proImage = document.createElement("img");
  proImage.src = element.image_urls[0];

  let popupProductImageDiv = document.querySelector("#popupProductImageDiv");
  // Clear image
  popupProductImageDiv.innerHTML = "";
  popupProductImageDiv.append(proImage);

  popupProductName.innerHTML = element.name;
  popupProductPrice.innerHTML = `$${element.price}`;
  noOfItemsInCart.innerHTML = `(${cartData.length} Items in your cart)`;

  let subtotal = cartData.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  popupProductSubtotal.innerHTML = `$ ${subtotal.toFixed(2)}`;
}

updateData();
renderProductCards(wishlistData);
