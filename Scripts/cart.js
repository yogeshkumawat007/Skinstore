fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let randomData = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * data.length);
      randomData.push(data[index]);
    }
    localStorage.setItem("randomData", JSON.stringify(randomData));
  })
  .catch((error) => console.error("Error:", error));

let randomData = JSON.parse(localStorage.getItem("randomData")) || [];

var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let allProductSubtotal = 0;
let discount = 0;

function renderProducts(data) {
  data.forEach(function (element) {
    let cartProductSingleCard = document.createElement("div");
    cartProductSingleCard.className = "cartProductSingleCard";

    let productImageAndTitle = document.createElement("div");
    productImageAndTitle.className = "productImageAndTitle";

    let imageWrapper = document.createElement("div");
    imageWrapper.id = "imageWrapper";

    let productImage = document.createElement("img");
    productImage.src = element.image_urls[0];
    imageWrapper.appendChild(productImage);

    let productTitleWrapperCartPage = document.createElement("div");
    productTitleWrapperCartPage.id = "productTitleWrapperCartPage";

    let productTitle = document.createElement("p");
    productTitle.id = "product-title";
    productTitle.textContent = element.name;
    productTitleWrapperCartPage.appendChild(productTitle);

    productImageAndTitle.appendChild(imageWrapper);
    productImageAndTitle.appendChild(productTitleWrapperCartPage);

    let itemPriceWrapper = document.createElement("div");
    itemPriceWrapper.id = "itemPriceWrapper";

    let itemPrice = document.createElement("p");
    itemPrice.textContent = `$${element.price}`;
    itemPriceWrapper.appendChild(itemPrice);

    let quantity = 1;
    let productSubtotal = element.price * quantity;
    let quantitySelector = document.createElement("div");
    quantitySelector.id = "quantitySelector";

    let quantityDecrement = document.createElement("button");
    quantityDecrement.id = "quantityDecrement";
    quantityDecrement.innerHTML = '<i class="fa-solid fa-minus"></i>';
    quantitySelector.appendChild(quantityDecrement);

    quantityDecrement.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        productSubtotal = quantity * element.price;
        allProductSubtotal -= Number(element.price);
        quantitySpan.textContent = quantity;
        subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

        // recalculate the discount
        if (hasDiscountBeenApplied) {
          discount = allProductSubtotal * 0.3; // apply a 30% discount
        }

        updateSummery();
      }
    });

    let quantitySpan = document.createElement("span");
    quantitySpan.textContent = quantity;
    quantitySelector.appendChild(quantitySpan);

    let quantityIncrement = document.createElement("button");
    quantityIncrement.id = "quantityIncrement";
    quantityIncrement.innerHTML = '<i class="fa-solid fa-plus"></i>';
    quantitySelector.appendChild(quantityIncrement);

    quantityIncrement.addEventListener("click", function () {
      quantity++;
      productSubtotal = quantity * element.price;
      allProductSubtotal += Number(element.price);
      quantitySpan.textContent = quantity;
      subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

      // recalculate the discount
      if (hasDiscountBeenApplied) {
        discount = allProductSubtotal * 0.3; // apply a 30% discount
      }

      updateSummery();
    });

    let subtotalWrapper = document.createElement("div");
    subtotalWrapper.id = "subtotalWrapper";

    let subtotalPrice = document.createElement("p");
    subtotalPrice.textContent = `$${productSubtotal.toFixed(2)}`;

    subtotalWrapper.appendChild(subtotalPrice);

    let removeIconWrapper = document.createElement("div");
    removeIconWrapper.id = "removeIconWrapper";

    let removeIcon = document.createElement("i");
    removeIcon.className = "fa-solid fa-circle-xmark";
    removeIconWrapper.appendChild(removeIcon);
    subtotalWrapper.appendChild(removeIconWrapper);

    removeIcon.addEventListener("click", removeProduct);

    cartProductSingleCard.appendChild(productImageAndTitle);
    cartProductSingleCard.appendChild(itemPriceWrapper);
    cartProductSingleCard.appendChild(quantitySelector);
    cartProductSingleCard.appendChild(subtotalWrapper);

    let parent = document.querySelector("#cartItemShowCaseWrapper");
    parent.appendChild(cartProductSingleCard);
    renderWishlistSection();
    allProductSubtotal += productSubtotal;
  });
  updateSummery();
}
// Render wishlist
function renderWishlistSection() {
  let parent = document.querySelector("#cartItemShowCaseWrapper");
  let cartWishlistDiv = document.createElement("div");
  cartWishlistDiv.className = "cartWishlistDiv";

  let cartWishListInnerDiv = document.createElement("div");
  cartWishListInnerDiv.className = "cartWishListInnerDiv";

  let cartWishListButton = document.createElement("button");
  cartWishListButton.id = "cartWishListButton";

  let cartWishlistIconSpan = document.createElement("span");
  cartWishlistIconSpan.id = "cartWishlistIconSpan";

  let cartWishlistIcon = document.createElement("i");
  cartWishlistIcon.className = "fa-regular fa-heart";
  cartWishlistIcon.style.color = "#000000";
  cartWishlistIconSpan.appendChild(cartWishlistIcon);

  let cartWishListText = document.createElement("span");
  cartWishListText.id = "cartWishListText";
  cartWishListText.textContent = " Save to Wishlist ";

  cartWishListButton.appendChild(cartWishlistIconSpan);
  cartWishListButton.appendChild(cartWishListText);

  cartWishListInnerDiv.appendChild(cartWishListButton);
  cartWishlistDiv.appendChild(cartWishListInnerDiv);

  parent.appendChild(cartWishlistDiv);
}

// Bottom product showcase
function renderProductCards(data) {
  var parentDiv = document.querySelector("#upsellProductShowcase");
  parentDiv.innerHTML = "";
  data.forEach(function (element, index) {
    var image_url = element.image_urls[0];
    var name = element.name;
    var price = element.price;

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "productCardDiv");
    var imageAndWishListDiv = document.createElement("div");
    imageAndWishListDiv.setAttribute("id", "imageAndWishListDiv");
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("id", "imageDiv");

    var image = document.createElement("img");

    var productDetailsDiv = document.createElement("div");
    productDetailsDiv.setAttribute("id", "productDetailsDiv");

    var proName = document.createElement("h3");
    proName.innerHTML = name;

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

    productDetailsDiv.append(proName, ratingContainer, priceElement);

    image.src = image_url;
    imageDiv.append(image);
    imageAndWishListDiv.append(imageDiv);
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

    var parentDiv = document.querySelector("#upsellProductShowcase");
    parentDiv.append(cardDiv);
  });
}
// Remove feature
function removeProduct(event) {
  let productElement = event.target.closest(".cartProductSingleCard");

  let title = productElement.querySelector("#product-title").textContent;

  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  let index = cartData.findIndex(function (product) {
    return product.name === title;
  });

  if (index !== -1) {
    cartData.splice(index, 1);
  }

  localStorage.setItem("cartData", JSON.stringify(cartData));

  let price = Number(
    productElement.querySelector("#itemPriceWrapper p").textContent.slice(1)
  );
  let quantity = Number(
    productElement.querySelector("#quantitySelector span").textContent
  );

  allProductSubtotal -= price * quantity;

  // update the discount
  if (hasDiscountBeenApplied) {
    discount = allProductSubtotal * 0.3; // apply a 30% discount
  }

  productElement.remove();

  let wishlistSection = document.querySelector(".cartWishlistDiv");
  if (wishlistSection) {
    wishlistSection.remove();
  }

  updateSummery();
}

function updateSummery() {
  let itemCount = document.querySelector("#pricingFinalSubtotal");
  itemCount.innerHTML = `Subtotal (${cartData.length} Items)`;

  let discountElement = document.querySelector("#discountPrice");
  discountElement.innerHTML = `-$${discount.toFixed(2)}`;

  let cartSummerySubtotal = document.querySelector("#cartSummerySubtotal");
  cartSummerySubtotal.innerHTML = `$${allProductSubtotal.toFixed(2)}`;

  let totalCartPrice = document.querySelector("#totalCartPrice");
  totalCartPrice.innerHTML = `$${(allProductSubtotal - discount).toFixed(2)}`;
}

// Coupon management
let hasDiscountBeenApplied = false;
let appliedPromoCode = "";

let appliedCouponManagement = document.querySelector(
  ".appliedCouponManagement"
);
let couponAlerts = document.querySelector(".couponAlerts");
let couponAlertText = document.querySelector("#couponAlertText");
let applyDiscountWrapperButton = document.querySelector(
  ".applyDiscountWrapper button"
);
let applyDiscountWrapperInput = document.querySelector(
  ".applyDiscountWrapper input"
);
let showCouponIcon = document.querySelector("#showCoupon i");

appliedCouponManagement.style.display = "none";
couponAlerts.style.display = "none";

applyDiscountWrapperButton.addEventListener("click", function () {
  let promoCode = applyDiscountWrapperInput.value.toUpperCase();

  if (promoCode === "HIGH30" || promoCode === "MESSI30") {
    if (!hasDiscountBeenApplied) {
      discount = allProductSubtotal * 0.3;
      hasDiscountBeenApplied = true;
      appliedPromoCode = promoCode;
      updateSummery();

      appliedCouponManagement.style.display = "block";
      document.querySelector("#showCoupon p").textContent = promoCode;

      couponAlerts.style.display = "none";
    } else {
      couponAlertText.textContent = "Discount has already been applied.";
      couponAlerts.style.display = "block";
    }
  } else {
    // show an alert in the couponAlerts div
    couponAlertText.textContent = "Invalid promo code.";
    couponAlerts.style.display = "block";
  }
});

showCouponIcon.addEventListener("click", function () {
  // remove the discount
  allProductSubtotal += discount;
  discount = 0;
  hasDiscountBeenApplied = false;
  appliedPromoCode = ""; // clear the applied promo code
  updateSummery();

  // hide the appliedCouponManagement and couponAlerts divs
  appliedCouponManagement.style.display = "none";
  couponAlerts.style.display = "none";
});

updateSummery();
renderProductCards(randomData);
renderProducts(cartData);
