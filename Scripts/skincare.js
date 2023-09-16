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
  var parentDiv = document.querySelector("#productCatelog");
  parentDiv.innerHTML = "";
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
        renderPopupData(element);
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

const collapse = document.querySelectorAll(".collapse");

collapse.forEach((collapse) => {
  const filterTop = collapse.querySelector(".filterTop");
  filterTop.addEventListener("click", () => {
    collapse.classList.toggle("active");
  });
});

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

renderProductCards(skinCareProductsData);

function renderPopupData(element) {
  let popupProductName = document.querySelector("#popupProductName");
  let popupProductPrice = document.querySelector("#popupProductPrice");
  let popupProductSubtotal = document.querySelector("#popupProductSubtotal");
  let noOfItemsInCart = document.querySelector("#noOfItemsInCart");

  let proImage = document.createElement("img");
  proImage.src = element.image_urls[0];

  let popupProductImageDiv = document.querySelector("#popupProductImageDiv");
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

// Render Brand filter

let sortedBrandCounts = skinCareProductsData.reduce((acc, curr) => {
  let brand = curr.brand;
  if (!acc[brand]) {
    acc[brand] = 1;
  } else {
    acc[brand]++;
  }
  return acc;
}, {});

sortedBrandCounts = Object.entries(sortedBrandCounts)
  .sort((a, b) => b[1] - a[1])
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

let checkedBrands = [];

function renderBrandFilters() {
  let parent = document.querySelector("#brandCheckboxDiv");

  for (let key in sortedBrandCounts) {
    let label = document.createElement("label");
    label.className = "form-control";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkbox";
    input.id = key;

    let textNode = document.createTextNode(
      `${key} (${sortedBrandCounts[key]})`
    );

    label.append(input);
    label.append(textNode);

    parent.append(label);

    input.addEventListener("click", function () {
      if (this.checked) {
        checkedBrands.push(key);
      } else {
        let index = checkedBrands.indexOf(key);
        if (index > -1) {
          checkedBrands.splice(index, 1);
        }
      }

      let filteredData;
      if (checkedBrands.length > 0) {
        filteredData = skinCareProductsData.filter((product) =>
          checkedBrands.includes(product.brand)
        );
      } else {
        filteredData = skinCareProductsData;
      }
      renderProductCards(filteredData);
    });
  }
}

renderBrandFilters();

// Render Skintype filter

let sortedSkinTypeCounts = skinCareProductsData.reduce((acc, curr) => {
  let skinType = curr.skin_type;
  if (!acc[skinType]) {
    acc[skinType] = 1;
  } else {
    acc[skinType]++;
  }
  return acc;
}, {});

sortedSkinTypeCounts = Object.entries(sortedSkinTypeCounts)
  .sort((a, b) => b[1] - a[1])
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

let checkedSkinTypes = [];

function renderSkinTypeFilters() {
  let parent = document.querySelector("#skinTypeCheckboxDiv");

  for (let key in sortedSkinTypeCounts) {
    // Create new elements
    let label = document.createElement("label");
    label.className = "form-control";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkbox";
    input.id = key;

    let textNode = document.createTextNode(
      `${key} (${sortedSkinTypeCounts[key]})`
    );

    // Append the elements
    label.append(input);
    label.append(textNode);

    parent.append(label);

    // Add event listener to the checkbox
    input.addEventListener("click", function () {
      if (this.checked) {
        // Add the skin type to the list of checked skin types
        checkedSkinTypes.push(key);
      } else {
        // Remove the skin type from the list of checked skin types
        let index = checkedSkinTypes.indexOf(key);
        if (index > -1) {
          checkedSkinTypes.splice(index, 1);
        }
      }

      // Filter the data and call renderProductCards
      let filteredData;
      if (checkedSkinTypes.length > 0) {
        filteredData = skinCareProductsData.filter((product) =>
          checkedSkinTypes.includes(product.skin_type)
        );
      } else {
        // If no checkboxes are checked, use the original data
        filteredData = skinCareProductsData;
      }
      renderProductCards(filteredData);
    });
  }
}

renderSkinTypeFilters();
