fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let skinCareProducts = data.filter(
      (item) => item.product_type === "skinCare"
    );
    localStorage.setItem("skinCareProducts", JSON.stringify(skinCareProducts));
  })
  .catch((error) => console.error("Error:", error));

let skinCareProductsData =
  JSON.parse(localStorage.getItem("skinCareProducts")) || [];

var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];

function renderProductCards(data) {
  data.forEach(function (element, index) {
    var image_url = element.image_urls[0];
    var name = element.name;
    var price = element.price;

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "productCardDiv");
    var imageAndWishListDiv = document.createElement("div");
    imageAndWishListDiv.setAttribute("id", "imageAndWishListDiv");
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("id", "imageDiv");
    var wishlistDiv = document.createElement("div");
    wishlistDiv.setAttribute("id", "wishlistDiv");
    var image = document.createElement("img");
    var wishlistIcon = document.createElement("i");
    wishlistIcon.className = "fa-regular fa-heart";
    wishlistIcon.style.color = "#383535";

    var productDetailsDiv = document.createElement("div");
    productDetailsDiv.setAttribute("id", "productDetailsDiv");

    var proName = document.createElement("h3");
    proName.innerHTML = name;

    var textBox = document.createElement("p");
    textBox.setAttribute("id", "textBox");
    textBox.innerHTML = "New Arrival";
    // Stars
    var ratingContainer = document.createElement("div");
    ratingContainer.setAttribute("id", "ratingContainer");

    var ratingStars = document.createElement("span");
    ratingStars.setAttribute("id", "ratingStars");

    var noOfRatings = document.createElement("span");
    noOfRatings.setAttribute("id", "noOfRatings");
    noOfRatings.innerHTML = `(${element.reviews.total_reviews})`;

    var ratingStars = document.createElement("img");
    ratingStars.setAttribute("id", "ratingStars");
    ratingStars.src = "Media/stars.png";

    ratingContainer.append(ratingStars, noOfRatings);

    // Price element

    var priceElement = document.createElement("p");
    priceElement.setAttribute("id", "priceElement");
    priceElement.innerHTML = `$${price}`;

    productDetailsDiv.append(proName, textBox, ratingContainer, priceElement);

    image.src = image_url;
    imageDiv.append(image);
    wishlistDiv.append(wishlistIcon);
    imageAndWishListDiv.append(imageDiv, wishlistDiv);
    var addToCartButton = document.createElement("button");

    addToCartButton.innerHTML = "QUICK BUY";
    addToCartButton.setAttribute("id", "addToCartButton");

    cardDiv.append(imageAndWishListDiv, productDetailsDiv, addToCartButton);

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

    let clickedWishlist = false;
    wishlistIcon.addEventListener("click", function () {
      let index = wishlistData.indexOf(element);
      if (clickedWishlist == false) {
        wishlistIcon.className = "fa-solid fa-heart fa-bounce fa-lg";
        wishlistIcon.style.color = "#f18e8e";
        clickedWishlist = true;
        wishlistData.push(element);
      } else {
        wishlistIcon.className = "fa-regular fa-heart";
        wishlistIcon.style.color = "#383535";
        clickedWishlist = false;

        wishlistData.splice(index, 1);
      }
      localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
    });

    let clickedCart = false;
    addToCartButton.addEventListener("click", function () {
      if (!clickedCart) {
        clickedCart = true;
        cartData.push(element);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        openPopup();
      } else {
        alert("Produt is alredy in the cart");
      }
    });
    var noOfProducts = document.querySelector("#totalNoOfProducts");
    noOfProducts.innerHTML = `${data.length} results`;

    var parentDiv = document.querySelector("#productCatelog");
    parentDiv.append(cardDiv);
  });
}

var sortingElement = document.querySelector("#sortProduct");

var originalData = [...skinCareProductsData];

sortingElement.addEventListener("change", function () {
  var value = this.value;
  var sortedData;

  switch (value) {
    case "popularity":
      sortedData = [...skinCareProductsData].sort((a, b) => b.id - a.id);
      break;
    case "proceLtH":
      sortedData = [...skinCareProductsData].sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
      );
      break;
    case "prieHtL":
      sortedData = [...skinCareProductsData].sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
      );
      break;
    case "AtZ":
      sortedData = [...skinCareProductsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      sortedData = originalData;
  }

  var parentDiv = document.querySelector("#productCatelog");
  parentDiv.innerHTML = "";

  renderProductCards(sortedData);
});

const faqs = document.querySelectorAll(".collapse");

faqs.forEach((faq) => {
  const filterTop = faq.querySelector(".filterTop");
  filterTop.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

let popup = document.querySelector("#popup");

let closePopupButton = document.querySelector("#closePopupButton");
closePopupButton.addEventListener("click", closePopup);

var backdrop = document.getElementById("backdrop");

function openPopup() {
  popup.classList.add("open-popup");
  backdrop.classList.add("open-backdrop"); // Show backdrop when popup is open
}

function closePopup() {
  popup.classList.remove("open-popup");
  backdrop.classList.remove("open-backdrop"); // Hide backdrop when popup is closed
}

renderProductCards(skinCareProductsData);
