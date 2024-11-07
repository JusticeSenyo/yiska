import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle products array on each page load
shuffleArray(products);

function generateProductGrid(productsList) {
  let productHtml = '';
  productsList.forEach((product) => {
    productHtml += `
  <div class="content">
      <div class="product-image">
        <img src="${product.image}" alt="">
      </div>
          <div class="price">GH₵
        ${(product.pricePeswass / 100).toFixed(2)}
      </div>
      <div class="product-name">
        ${product.name}
      </div>

      <div class="amount">
        
        <select class="js-quantity-selector-${product.id}" id="mselect ">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="buy-button">
        <button class="add-to-cart js-add-to-cart"
        data-product-id="${product.id}">
        Add To Cart
        </button> 
      </div>
    </div>
  `
  });

  document.querySelector('.js-products-container').innerHTML = productHtml;

  updatecartquantity();

  function updatecartquantity(){
    let cartquantity = 0;

      cart.forEach((item) => {
        cartquantity += item.quantity;
      });
      document.querySelector('.js-cart-number').innerHTML = cartquantity;
  }


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      addToCart(productId, quantitySelector)
      updatecartquantity();
    });
  });
};

// Function to filter products by price range
function filterProductsByPriceRange(minPrice, maxPrice) {
  // Filter products based on the selected price range
  const filteredProducts = products.filter((product) => {
    const productPrice = product.pricePeswass / 100;
    if (maxPrice) {
      return productPrice >= minPrice && productPrice <= maxPrice;
    } else {
      // If maxPrice is undefined, it means "200+" (i.e., above GH₵200)
      return productPrice >= minPrice;
    }
  });

  generateProductGrid(filteredProducts);

  if (filteredProducts.length === 0) {
    document.querySelector('.js-products-container').innerHTML = `<p>No products found in this price range</p>`;
  }
}

// Apply Price Filter on button click
document.querySelector('.filter-button').addEventListener('click', () => {
  const selectedRange = document.querySelector('input[name="price-range"]:checked');

  if (!selectedRange) {
    alert("Please select a price range.");
    return;
  }

  const [minPrice, maxPrice] = selectedRange.value.split('-');

  // Apply the filter using the selected price range
  filterProductsByPriceRange(Number(minPrice), maxPrice ? Number(maxPrice) : undefined);

  const menuToggle = document.getElementById('menu-toggle');
  menuToggle.click();


});

generateProductGrid(products);

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-cart-number').innerHTML = cartQuantity;
}

// Function to filter products based on selected category
function filterProductsByCategory(selectedCategory) {
  // Filter products based on the selected category
  const filteredProducts = products.filter((product) => {
    return selectedCategory ? product.category === selectedCategory : true;
  });

  generateProductGrid(filteredProducts);

  if (filteredProducts.length === 0) {
    document.querySelector('.js-products-container').innerHTML = `<p>No products found in this category</p>`;
  }
}

// Attach click event listeners to category divs
document.querySelectorAll('.category-div').forEach((categoryDiv) => {
  categoryDiv.addEventListener('click', () => {
    const selectedCategory = categoryDiv.dataset.category;
    filterProductsByCategory(selectedCategory);


    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar'); 

    if(sidebar.classList.contains('open')){
      menuToggle.click();
    };

    document.querySelectorAll('.category-div').forEach((div) => {
      div.classList.remove('buttom');
    });

    categoryDiv.classList.add('buttom')
  });
});

document.querySelector('.ALL').addEventListener('click', () => {
  generateProductGrid(products); // Reset to show all products
});

function searchfilter(event) {
  const searchQuery = event.target.value.toLowerCase().trim();
  
  // Filter products based on the search query
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery);
  });
  // Update the product grid with the filtered products
  generateProductGrid(filteredProducts);
  // If no products match, you can add a message like this:
  if (filteredProducts.length === 0) {
    document.querySelector('.js-products-container').innerHTML = `<p>No products found</p>`;
  }
};
document.querySelector('.js-search-input-small').addEventListener('input', searchfilter);
document.querySelector('.js-search-input-big').addEventListener('input', searchfilter);

updateCartQuantity();