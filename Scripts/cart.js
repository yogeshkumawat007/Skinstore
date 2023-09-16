var cartData = JSON.parse(localStorage.getItem("cartData")) || [];

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
    let quantitySelector = document.createElement("div");
    quantitySelector.id = "quantitySelector";

    let quantityDecrement = document.createElement("button");
    quantityDecrement.id = "quantityDecrement";
    quantityDecrement.innerHTML = '<i class="fa-solid fa-minus"></i>';
    quantitySelector.appendChild(quantityDecrement);

    let quantitySpan = document.createElement("span");
    quantitySpan.textContent = quantity;
    quantitySelector.appendChild(quantitySpan);

    let quantityIncrement = document.createElement("button");
    quantityIncrement.id = "quantityDecrement";
    quantityIncrement.innerHTML = '<i class="fa-solid fa-plus"></i>';
    quantitySelector.appendChild(quantityIncrement);

    let subtotalWrapper = document.createElement("div");
    subtotalWrapper.id = "subtotalWrapper";

    let subtotalPrice = document.createElement("p");
    subtotalPrice.textContent = `$${(quantity * Number(element.price)).toFixed(
      2
    )}`;

    quantityDecrement.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        quantitySpan.innerHTML = quantity;
        subtotalPrice.textContent = `$${(
          quantity * Number(element.price)
        ).toFixed(2)}`;
      }
    });

    quantityIncrement.addEventListener("click", function () {
      quantity++;
      quantitySpan.innerHTML = quantity;
      subtotalPrice.textContent = `$${(
        quantity * Number(element.price)
      ).toFixed(2)}`;
    });
    subtotalWrapper.appendChild(subtotalPrice);

    let removeIconWrapper = document.createElement("div");
    removeIconWrapper.id = "removeIconWrapper";

    let removeIcon = document.createElement("i");
    removeIcon.className = "fa-solid fa-circle-xmark";
    removeIconWrapper.appendChild(removeIcon);
    subtotalWrapper.appendChild(removeIconWrapper);

    cartProductSingleCard.appendChild(productImageAndTitle);
    cartProductSingleCard.appendChild(itemPriceWrapper);
    cartProductSingleCard.appendChild(quantitySelector);
    cartProductSingleCard.appendChild(subtotalWrapper);

    let parent = document.querySelector("#cartItemShowCaseWrapper");
    parent.appendChild(cartProductSingleCard);
    renderWishlistSection();
  });
}

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

renderProducts(cartData);
