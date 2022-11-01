const getProducts = async () => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}


const showProducts = async () =>{
  const productsContainer = document.getElementById('productsContainer');
  const prods = await getProducts();
  productsContainer.innerHTML = prods.map(product =>`<div>${product.title} $ ${product.price}</div>`).join(" ")
  
}
const getProductsBtn = document.getElementById('getProductsBtn')
getProductsBtn.addEventListener("click", showProducts)
