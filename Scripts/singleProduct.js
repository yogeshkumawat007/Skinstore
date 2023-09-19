let singleProArr = [
  {
    id: "777",
    image_urls: [
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11118731-1274905484791816.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11118731-1924905484857501.jpg",
      "https://static.thcdn.com/images/large/webp//productimg/1600/1600/11118731-8254902133386459.jpg",
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
];

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

let sppDataArr = [];

function funAddToCartYk() {
  // console.log(singleProArr[0])

  let cartObjYk = {
    img: singleProArr[0].image_urls[0],
    price: document.getElementById("sppPrice").innerHTML,
    quantity: document.getElementById("sppQuantitySpan").innerHTML,
    name: singleProArr[0].name,
  };

  console.log("cartObjYk:", cartObjYk);

  sppDataArr.push(singleProArr[0]);

  localStorage.setItem("sppDataYk", JSON.stringify(sppDataArr));
}

// adding event on Wishlist
document
  .querySelector("#sppAddWishlist")
  .addEventListener("click", wishListsppYk);

function wishListsppYk() {
  console.log("clicked on wishListsppYk");
}