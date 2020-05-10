const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getProductsCart(products){
  const productsItems = products.map(product => { 
    return { 
      name: product.name, 
      category: product.category
    }
  });
    
    return productsItems
}

function getPromotion(products, promotions) {
  const categories = []
  products.map(product => {
    if(!categories.includes(product.category))
      categories.push(product.category)
     
  })

    return promotions[categories.length - 1]
}

function getTotalPrice(products, promotion) {
  const totalPrice = products.reduce((initialPrice, product) => {
    let productPromotion = product.promotions.find((productPromotion) => {
      return productPromotion.looks.includes(promotion)
    })

      if (!productPromotion) {
        productPromotion = { price: product.regularPrice };
      }

        return initialPrice + productPromotion.price;
  }, 0.0).toFixed(2)
    
        return totalPrice
}
  
function getRegularPrice(products) {
  const regularTotalPrice = products.reduce((initialValue, product) => {
    return initialValue + product.regularPrice
  }, 0.0);
 
    return regularTotalPrice;
}

function getShoppingCart(ids, productsList) {
  const products = productsList.filter(product => ids.includes(product.id));
  const productsNameCategory = getProductsCart(products);
  const promotion = getPromotion(products, promotions)
  const totalPrice = getTotalPrice(products, promotion);
  const regularTotalPrice = getRegularPrice(products);
  const discountValue = (regularTotalPrice - totalPrice).toFixed(2);
  const discount = ((discountValue / regularTotalPrice ) * 100).toFixed(2) + "%";

 
  return {
    products: productsNameCategory,
    promotion,
    totalPrice,
    discountValue,
    discount
  }
    
}

module.exports = { getShoppingCart };
    
    




