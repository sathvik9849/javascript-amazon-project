export let cart = []
export function addToCart(productId) {
    let matchedProduct;
      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchedProduct = cartItem
        }
      })
      if(matchedProduct){
        matchedProduct.quantity+=1
      }else{
        cart.push({
          productId: productId,
          quantity: 1
        }); 
      }
  }
  