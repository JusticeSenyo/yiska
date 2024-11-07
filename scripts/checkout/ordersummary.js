import {cart, removefromcart, updatequantity, addTotal} from '../../data/cart.js';
import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { addOrder } from '../../data/orders.js';



export function renderOrderSummary(){

let cartsummaryHtml = '';
let totalPerItem = [];

  // Check if cart is empty
  if (cart.length === 0) {
    // Display the "cart is empty" message if no items are in the cart
    cartsummaryHtml = `
      <div class="empty-cart-container">
        <div class="empty-cart-message">
        <div cass="one">
          <p>Your cart is empty.</p>
          <a href="yiska.html" class="add-to-cart-link">Click here to add items</a>
          </div>
          <img class="empty-cart-image" src="images/empty-cart.png" alt="Empty cart image"></img>
        </div>
      </div>
    `;
    document.querySelector('.js-cart-container').innerHTML = cartsummaryHtml;
    document.querySelector('.place-order').classList.add('empty-order');
    document.querySelector('.cart-title').innerHTML = '';

    // Clear the payment summary when the cart is empty
    document.querySelector('.js-place-order').innerHTML = '';
    updatecartquantityheader();
    return; // Stop further execution
  }

cart.forEach((cartitem) => {
  
  const productId = cartitem.productId;
  
  let matchingproduct;
  products.forEach((product) => {
    if(product.id === productId){
      matchingproduct = product;
    }
  })
  const totalPesswas = matchingproduct.pricePeswass * cartitem.quantity;
  totalPerItem.push(totalPesswas);

  cartsummaryHtml +=
  `
      <div class="cart-item js-item-remove-${matchingproduct.id}">
      <div class="div1">
      <img class="cart-item-image" src="${matchingproduct.image}" alt="Item 1">
      <div class="item-details">
        <div class="item-name">${matchingproduct.name}</div>
        <div class="item-price">Price: GH₵${formatCurrency(matchingproduct.pricePeswass)}</div>
        <div class="item-quantity new-quantity-${matchingproduct.id}"> Quantity : ${cartitem.quantity}</div>
        <div>
        <span class="quantity">  Quantity : </span>
        <input type="number" value="${cartitem.quantity}"class="new-quantity-input js-quantity-input-${matchingproduct.id}">
        </div>
        <div class="item-quantity-update"> 
        <button class="remove-button js-update-buton" data-product-id="${matchingproduct.id}">Update</button>
        <button class="remove-button js-save-button" data-product-id="${matchingproduct.id}">save</button>
          
        </div>
      </div>
      </div> 
      <div class="item-actions">
        <div class="js-total-price-${matchingproduct.id} total-price" data-product-id="${matchingproduct.id}">
        Total: GH₵${formatCurrency(totalPesswas)}
        </div>
        <button class="remove-button js-delete-link" data-product-id=${matchingproduct.id}>Remove</button>
      </div>
    </div>
      `
});
document.querySelector('.js-cart-container').innerHTML = cartsummaryHtml;

let overallTotal = 0;

totalPerItem.forEach(totalPesswas => {
  overallTotal += totalPesswas;
const paymentSummaryHtml = `
          <u><p style="font-size: 20px;">order total</p></u>
          <div class="order-total">
            <p>total :</p>
            <p>GH₵ ${formatCurrency(overallTotal)}</p>
          </div>
          <button class="place-order-button" id="place-order-button">
            place order
          </button>
        </div>       
`
document.querySelector('.js-place-order').innerHTML = paymentSummaryHtml;

});

  document.getElementById('place-order-button').addEventListener('click', () => {
    const order = {
      id: Date.now(), // Use a timestamp as a unique ID (or implement a better method)
      orderTime: new Date(),
      totalCostCents:  overallTotal, // Convert to cents
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTime: new Date(Date.now() + 86400000), // Set delivery time to 1 day later (adjust as needed)
      })),
    };
    
    addOrder(order); // Call the addOrder function to save the order

    // Reset the cart
    cart.length = 0; // Clear the cart array
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Order placed successfully!');
    window.location.href = 'orders.html';
  });

updatecartquantityheader();
function updatecartquantityheader(){
let cartQuantity = 0;

      cart.forEach((cartitem) => {
        cartQuantity += cartitem.quantity;
      });

      document.querySelector('.js-return-to-home-link')
      .innerHTML =` Checkout (${cartQuantity} items)`;
    }

    
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        removefromcart(productId);
        
        const item = document.querySelector(`.js-item-remove-${productId}`);
        item.remove();
        updatecartquantityheader()
        renderOrderSummary();
  })
});


      document.querySelectorAll('.js-update-buton').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          document.querySelector(`.js-item-remove-${productId}`).classList.add('is-edting-quantity');
        })
      })

      document.querySelectorAll('.js-save-button').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          document.querySelector(`.js-item-remove-${productId}`).classList.remove('is-edting-quantity');

          const quantityinput = document.querySelector(`.js-quantity-input-${productId}`);
          const newquantity = Number(quantityinput.value);

          updatequantity(productId, newquantity);

          let cartQuantity = 0;

          cart.forEach((cartitem) => {
            cartQuantity += cartitem.quantity;
          });

          
          document.querySelector('.js-return-to-home-link').innerHTML = `Checkout (${newquantity} items)`;
          updatecartquantityheader();
          document.querySelector(`.new-quantity-${productId}`).innerHTML= `Quantity : ${newquantity}`;
          
          renderOrderSummary();
          
      })
    });
  }