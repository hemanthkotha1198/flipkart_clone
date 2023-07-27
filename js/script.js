// Get product elements and add click event listener to each "Add to Cart" button
const products = document.querySelectorAll('.product');
products.forEach(product => {
  const addToCartButton = product.querySelector('.add-to-cart');
  addToCartButton.addEventListener('click', addToCart);
});

// Shopping cart array to hold selected products
let cartItems = [];
const notification=0; 

// Function to add a product to the cart
function addToCart(event) {
  const product = event.target.parentElement;
  window.alert("The element will be added to the cart");
  const productId = parseInt(product.getAttribute('data-id'));
  const productName = product.getAttribute('data-name');
  const productPrice = parseInt(product.getAttribute('data-price'));
  const productimage = product.getAttribute('data-img');
  
  // Check if the product is already in the cart
  const existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productimage,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  updateNotifyBadge();
}

// Function to update the notification badge with the total quantity of items in the cart
function updateNotifyBadge() {
  const notifyBadge = document.getElementById("notification-badge");
  let totalQuantity = 0;

  // Calculate the total quantity by summing the quantity of each item in the cart
  cartItems.forEach(item => {
    totalQuantity += item.quantity;
  });

  // Update the notification badge with the total quantity
  notifyBadge.textContent = totalQuantity;

  const carttotalitems = document.getElementById('totalitems');
  carttotalitems.textContent = `${totalQuantity}`;

  // If the cart is empty, hide the badge (optional)
  if (totalQuantity === 0) {
    notifyBadge.style.display = "none";
  } else {
    notifyBadge.style.display = "inline-block";
  }
}

// Function to update the cart display with individual items and total price
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';
  let totalPrice = 0; // Initialize the total price to zero

  cartItems.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      // Create the product image element and set its attributes
      const productImage = document.createElement('img');
      productImage.src = item.image; // Get the image URL from the item's image property
      productImage.classList.add('product-image'); // Optionally, you can add a CSS class to style the product images if needed

      // Append the product image to the cart item
      cartItemDiv.appendChild(productImage);

      // Create a haedings for the item details
      
      const nm= document.createElement('h4');
      const quan= document.createElement('h6');
      const pr= document.createElement('h4');

      
      nm.textContent = `${item.name}`;
      quan.textContent = `Quantity: ${item.quantity} `;
      pr.textContent = `₹${(item.price * item.quantity).toFixed(2)}`;


      // Append the item details to the cart item
      cartItemDiv.appendChild(nm);
      cartItemDiv.appendChild(quan);
      cartItemDiv.appendChild(pr);

      // Append the cart item to the cart items container
      cartItemsDiv.appendChild(cartItemDiv);
      
      
        // Create the remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        const placeorder = document.createElement('button');
        placeorder.textContent = 'PLACE ORDER';
        placeorder.classList.add('place-order');


        removeButton.addEventListener('click', () => {
            removeItemFromCart(item.id);
        });
        cartItemDiv.appendChild(removeButton);
        cartItemDiv.appendChild(placeorder);
        
        // const placeorders = document.getElementsByClassName("place-order");
        // placeorders.addEventListener('click',placee);
        // function placee(event)
        // {
        //   window.location.href="login.html";
        // }          
       
        placeorder.addEventListener('click', () =>
        {
          window.location.href="./html/login.html";
        });
        
        // Function to remove a product from the cart
        function removeItemFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        updateCartDisplay();
        updateNotifyBadge();
        window.alert("The item will be removed");
        }

      

      // Calculate the total price
      totalPrice += item.price * item.quantity;
  });

  // Display the total price in the cart summary section
  const cartTotalPriceElement = document.getElementById('total-price');
  cartTotalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;

}
// Call the updateNotifyBadge() function on page load to display the initial value
updateNotifyBadge();
// Call the updateCartDisplay() function on page load to display the initial cart items
updateCartDisplay();


