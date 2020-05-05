
 const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

  function getShoppingCart(ids, productsList) {

  //buscando os produdutos por id
  const products = productsList.filter(product => ids.includes(product.id));

  //retornando apenas name e category
  const productsItems = products.map(product => { 
    return { 
      name: product.name, 
      category: product.category
    }
  });

  //buscando apenas category 
  const category = products.map(product => product.category);

  //contando a qtda de cada categoria 
  const categoryReduce = category.reduce( (object , item) =>{  
    if ( !object[item] ) {
      object[item] = 1;
    } else {
      object[item]++;
    }
      return object; 
    },[]);

  //retornando apenas os item (valores) das categorias
  const numberOfCategories = Object.values(categoryReduce);

  //retornando o maior numero (entre as categorias)
  const categoryPromotion = numberOfCategories.reduce((a,b) =>{ 
	  return Math.max(a, b)
  },[]);

  //verificando qual é a promoção 
  const promotion = categoryPromotion >= 4 ? 
	promotions[0] : categoryPromotion === 1 ? 
	promotions[3] : promotions[categoryPromotion - 1];

  //somando os preços sem desconto
  const regularTotalPrice = products.reduce((initialValue, product) => {
    return initialValue + product.regularPrice
  }, 0.0);

  //verificando se a promoção se aplica e retornando o valor total com promoção
  const totalPrice = products.reduce((initialPrice, product) => {
    let productPromotion = product.promotions.find((productPromotion) => {
      return productPromotion.looks.includes(promotion)
    });
    if (!productPromotion) {
      productPromotion = { price: product.regularPrice };
    }
      return initialPrice + productPromotion.price;
    }, 0.0).toFixed(2)



  const discountValue = (regularTotalPrice - totalPrice).toFixed(2);
  const discount = ((discountValue / regularTotalPrice ) * 100).toFixed(2) + "%";

  return {
    products: productsItems,
    promotion,
    totalPrice,
    discountValue,
    discount
  };

}

module.exports = { getShoppingCart };


