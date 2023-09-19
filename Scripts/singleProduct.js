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
  }
};

$(function () {
  $("#footer").load("footer.html");
});
