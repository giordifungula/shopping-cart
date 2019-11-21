$(document).ready(function() {
  // jQuery methods go here...
  // Remove Itmes
  $(".shop-items").css("width", "100%").slideUp(100).slideDown(600);
//   chained method
// Animation
//   $('.card-img-top').animate({left:'0px'},1200);

//   $( ".shop-img" ).toggle( "slide" );

//   Scroll in Effect
$(".shop-img").animate({
    marginLeft: "70px"
  }, 400);

});

  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", LoadFunctions);
    // listen to the document being loaded
  } else {
    LoadFunctions();
    // Run the Load Functions
  }

  function LoadFunctions() {
    let removeBtn = $(".btn-danger");
    // grab all remove buttons
    for (var i = 0; i < removeBtn.length; i++) {
      let btn = removeBtn[i];
      btn.addEventListener("click", removeItem);
    //   btn.click(removeBtn)
    }

    let addCartBtn = $(".shop-item-btn");
    // grab all the add to cart buttons
    console.log(addCartBtn)
    for (var i = 0; i < addCartBtn.length; i++) {
      let btn = addCartBtn[i];
      console.log(btn)
      btn.addEventListener("click", addItem);
    //   btn.delegate('click', addItem);
        
    }
  }
  function removeItem(e) {
    let clicked = e.target;
    // Grab the currene element that is clicked
    let cartItem = clicked.parentElement.parentElement.remove();
    // Remove the whole row
    updateCartItems();
  }

  // Shipping Infromation will be store here before all other radio value funcions
  let shippingCost;
  // price  will be added to Update Cart
  // gets the radioValue Input for Shipping
  function getRadioValue(ship) {
    // Grabs the radio selected value and assigns it to Shipping Cost
    let radios = Shipping.elements[ship];
    let rdValue;
    console.log(radios);
    for (var i = 0; i < radios.length; i++) {
      let someRadio = radios[i];
      if (someRadio.checked) {
        rdValue = someRadio.value;
        break;
      } else rdValue = "noRadioChecked";
    }
    switch (rdValue) {
      case "DHL":
        shippingCost = 200;
        alert("Price is R" + shippingCost);
        break;
      case "Aramex":
        shippingCost = 150;
        alert("Price is R" + shippingCost);
        break;
      case "POST":
        shippingCost = 50;
        alert("Price is R" + shippingCost);
        break;
    }
    let shippingDisplay = document.getElementsByClassName(
      "cart-shipping-price"
    )[0];
    shippingDisplay.innerHTML = "R" + shippingCost;
    updateCartItems();
  }

  // getDeliveryValue lets you choose if you would like shipping or not
  function getDeliveryValue(del) {
    let radio = Delivery.elements[del];
    console.log(radio);
    window.rdDelivery;
    console.log(radio);
    for (var i = 0; i < radio.length; i++) {
      let someRadio = radio[i];
      if (someRadio.checked) {
        rdDelivery = someRadio.value;
        console.log(someRadio.value);
        break;
      } else rdDelivery = "noRadioChecked";
    }
    switch (rdDelivery) {
      // check discount that is selected
      case "no":
        // discountCost = 0.1;
        shippingCost = 0;
        let shippingDisplay = document.getElementsByClassName(
          "cart-shipping-price"
        )[0];
        shippingDisplay.innerHTML = shippingCost;
        alert("No shipping will be selected");
        break;
      // output the discount and store depending on what was selected
    }
    let discountDisplay = document.getElementsByClassName(
      "cart-discount-price"
    )[0];
    // select the discount display
    discountDisplay.innerHTML = "R" + discountCost;
    // output to the discount display
    console.log(discountCost);
    updateCartItems();
  }

  // getting the Discount Value with function
  let discountCost;
  function getDiscountValue(disc) {
    // Grabs the radio selected value and assigns it to Shipping Cost
    let radio = Discount.elements[disc];
    console.log(radio);
    window.rdDiscount;
    console.log(radio);
    for (var i = 0; i < radio.length; i++) {
      let someRadio = radio[i];
      if (someRadio.checked) {
        rdDiscount = someRadio.value;
        console.log(someRadio.value);
        break;
      } else rdDiscount = "noRadioChecked";
    }
    // alert('rdDicount is ',rdDiscount);
    switch (rdDiscount) {
      // check discount that is selected
      case "10":
        discountCost = 0.1;
        alert("discount is R" + discountCost);
        break;
      case "5":
        discountCost = 0.05;
        alert("Discount is R" + discountCost);
        break;
      case "2":
        discountCost = 0.02;
        alert("Discount is R" + discountCost);
        break;
      // output the discount and store depending on what was selected
    }
    let discountDisplay = document.getElementsByClassName(
      "cart-discount-price"
    )[0];
    // select the discount display
    discountDisplay.innerHTML = discountCost;
    // output to the discount display
    console.log(discountCost);
    updateCartItems();
  }

  //
  console.log("Outside All Functions price is" + shippingCost);
  function addItem(btn) {
    let addBtn = btn.target;
    // grab btn target that is clicked now
    let shopItem = addBtn.parentElement.parentElement;
    let shopTitle = shopItem.getElementsByClassName("card-title")[0].innerHTML;
    let shopImg = shopItem.getElementsByClassName("shop-img")[0].src;
    console.log(shopItem + "is the shop item")
    console.log(shopTitle + "is the shop Title")
    console.log(shopImg + "is the shop Image")
    let shopPrice = shopItem
      .getElementsByClassName("card-price")[0]
      .innerHTML.replace("Price: R", "");
    console.log(shopPrice + "is the price");
    addItemClicked(shopTitle, shopPrice, shopImg);
    getRadioValue("shipping");
    getDiscountValue("discount");
    // When Item is added run the Radio Selected Function to assign Variables
  }
  function addItemClicked(name, price, img) {
    let cartRow = document.createElement("div");
    // create a cart Row
    cartRow.classList.add("cart-row");
    // ser cart-row class to cartRow
    let cartItems = document.getElementsByClassName("cart-items")[0];
    // select the first cart items class
    let cartNames = document.getElementsByClassName("cart-item-title")[0];
    // Grab and store the cartName the first one
    
    let cartContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    // Creates CartContent with variables for name,price and img
    cartRow.innerHTML = cartContents;
    // Set the cartRow contents to the new created cart item
    cartItems.append(cartRow);
    // Add the cartRow that contains new content to CartItems which stores all the items
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeItem);
    // Allow the removeItem function to run after you created new car row contents
    updateCartItems();
    // Updated the cartItems and prices
    document
      .getElementsByClassName("btn-purchase")[0]
      .addEventListener("click", completedPurchase);
  }
  // complete purchase function below
  function completedPurchase() {
    let cart = document.getElementsByClassName("cart-items")[0];
    // select the cart items
    while (cart.hasChildNodes()) {
      cart.removeChild(cart.firstChild);
      // while there is elements inside remove the cart items
    
    }
    updateCartItems();
    // update the price after you purchase
    let generate = Math.floor(Math.random() * 200 + 1);
    alert("Thanks for your order, your Key is " + "ABC" + generate);
    let discountDisplay = document.getElementsByClassName(
      "cart-discount-price"
    )[0];
    // reset the Values for discount and price
    // Reload Page after purchase
    $('.cart-total-price').hide('slow');
    $('.cart-discount-price').hide('slow');
    // hides the cart price and discount
    window.location.reload();
  }

  // Update Cart Items and get Radio values
  function updateCartItems() {
    let cartContainer = document.getElementsByClassName("cart-items")[0];
    // Grab the Cart Container the first one
    console.log(cartContainer);
    let cartRows = document.getElementsByClassName("cart-row");
    // Grab the number of Cart Rows that is inside the Cart Container and stores all of them in CartRows
    let total = 0;
    // total will be added to what ever price Value
    for (var i = 1; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      // Grabs the current row item, this store the current item contents
      let getPriceElement = cartRow.getElementsByClassName("cart-price")[0];
      // Grabs the current elements price container;
      let getPriceValue = Number(getPriceElement.innerHTML.replace("R", " "));
      // getPriceValue Grabs the priceValue and converters it to a Number with Number()
      console.log(getPriceValue + " is the price value ");
      // Grabs thePriceValue and remove the $ symbol
      total = total + getPriceValue;
      // total adds the current Value plus the current total value
    }
    let priceDisplay = document.getElementsByClassName("cart-total-price")[0];
    let vat = 0.1;
    // Grabs the priceDisplay Element
    let calculateShippingAndTotal = total + shippingCost;
    let vatIncluded =
      calculateShippingAndTotal +
      calculateShippingAndTotal * vat -
      calculateShippingAndTotal * discountCost;
    // vatIncluded calculates the total including the discount selected
    // Calculate the Total Plus SHipping
    priceDisplay.innerHTML = "R" + vatIncluded;
    // output the Total of items + ShippingCost + discountCost and display
  }
