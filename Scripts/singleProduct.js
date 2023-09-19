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
let singleProArr = [];
var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];

window.onload = function () {
  var urlParams = new URLSearchParams(window.location.search);
  var product = urlParams.get("product");
  var decodedProduct = decodeURIComponent(product);
  var productObject = JSON.parse(decodedProduct);
  singleProArr.push(productObject);

  let img1 = document.getElementById("singleProImg1");
  let img2 = document.getElementById("singleProImg2");
  let img3 = document.getElementById("singleProImg3");

  img1.src = singleProArr[0].image_urls[0];
  img2.src = singleProArr[0].image_urls[1];
  img3.src = singleProArr[0].image_urls[2];

  img1.addEventListener("click", funImg1);
  img2.addEventListener("click", funImg2);
  img3.addEventListener("click", funImg3);

  //   fetching singleMainDivImg
  let singleMainDivImg = document.getElementById("singleMainDivImg");
  singleMainDivImg.src = img1.src;

  function funImg1() {
    console.log("cliecked 1");
    singleMainDivImg.src = img1.src;
  }

  function funImg2() {
    console.log("cliecked 2");
    singleMainDivImg.src = img2.src;
  }

  function funImg3() {
    console.log("cliecked 3");
    singleMainDivImg.src = img3.src;
  }

  //   adding description into des. div

  document.getElementById("sppDes").innerHTML = singleProArr[0].name;

  document.getElementById(
    "sppRating"
  ).innerHTML = ` ${singleProArr[0].reviews.average_rating}`;

  document.getElementById("sppPrice").innerHTML = singleProArr[0].price;

  // adding event on size change
  document.getElementById("smSizebtn").addEventListener("click", smSizebtnfun);
  document.getElementById("bgSizeBtn").addEventListener("click", bgSizebtnfun);

  function smSizebtnfun() {
    console.log("smsize");
    let price = +document.getElementById("sppPrice").innerHTML;
    // console.log(price)
    document.getElementById("sppPrice").innerHTML = `${Math.floor(
      price / 2.5
    ).toFixed(2)}`;
    // let newProductPrice =
  }

  function bgSizebtnfun() {
    console.log("bgsizebtn");
    document.getElementById("sppPrice").innerHTML = singleProArr[0].price;
    // console.log(typeof price,price)
  }

  // adding event to Inc and Dec btn
  document.querySelector("#sppIncBtn").addEventListener("click", sppIncFun);

  document.querySelector("#sppDecBtn").addEventListener("click", sppDecFun);

  let sppQuantitySpan = document.getElementById("sppQuantitySpan");

  let quantity = 1;
  sppQuantitySpan.innerText = `${quantity}`;

  function sppDecFun() {
    if (quantity > 1) {
      quantity--;
      sppQuantitySpan.innerText = `${quantity}`;
    }
  }

  function sppIncFun() {
    quantity++;
    sppQuantitySpan.innerText = `${quantity}`;
  }

  // add to cart funcationality
  let addToCartBtn = document.querySelector("#sppAddToCard");
  addToCartBtn.addEventListener("click", funAddToCartYk);

  function funAddToCartYk() {
    productObject.quantity = quantity;

    cartData.push(productObject);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    addToCartBtn.innerHTML = "ADDED TO CART";
    addToCartBtn.disabled = true;
  }
};

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

renderProductCards(randomData);

$(function () {
  $("#footer").load("footer.html");
});
