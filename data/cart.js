export let cart =  JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [
    {
    productId: '1',
    quantity: 2
  },
  {
    productId: '2',
    quantity: 2
  },
  {
    productId : '3',
    quantity: 2
  }
  ];
  } 

function savetostorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId,quantitySelector){
  let matchingitem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingitem = item;
      }
    });
    if(matchingitem){
      matchingitem.quantity += quantitySelector
    }else{
       cart.push({
      productId: productId,
      quantity: quantitySelector
  });
  }
  savetostorage();
}

export function removefromcart(productId){
  const newcart = [];

  cart.forEach((cartitem) => {
    if(cartitem.productId !== productId){
      newcart.push(cartitem);
    }
  });
  cart = newcart;

  savetostorage();
}

export function updatequantity(productId,newquantity){
  let matchingitem;
  cart.forEach((cartitem) => {
    if(productId === cartitem.productId){
      matchingitem = cartitem;
    }
  })

  matchingitem.quantity = newquantity;
  savetostorage();
}

  export function addTotal(matchingproduct,cartitem){
cart.forEach(() =>{

});
  };
