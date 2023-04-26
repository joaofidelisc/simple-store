import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) =>{
    const [addedProducts, setAddedProducts] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        // localStorage.removeItem("addedProducts");
        const storedProducts = localStorage.getItem("addedProducts");
        if (storedProducts) {
            setAddedProducts(JSON.parse(storedProducts));
        }
    }, []);

    // useEffect(() => {
    //   const newTotalPrice = addedProducts.reduce((accumulator, currentProduct) => {
    //       return accumulator + currentProduct.priceUpdated;
    //   }, 0);
    //   setTotalPrice(newTotalPrice);
    // }, [addedProducts]);
  

    const handleProducts = (product) => {
        const productExists = addedProducts.find((p) => p.id === product.id);
        if (!productExists){
            setAddedProducts((prevProducts) => {
              const newProducts = [
                ...prevProducts,
                {
                  title: product.title,
                  imgsrc: product.imgsrc,
                  description: product.description,
                  standardPrice: product.standardPrice,
                  priceUpdated: product.standardPrice,
                  category: product.category,
                  id: product.id,
                  quantity: 1
                },
              ];
              localStorage.setItem("addedProducts", JSON.stringify(newProducts));
              return newProducts;
            });
        }
      };
      
      const handleQuantityProducts = (id, operation) =>{
        const index = addedProducts.findIndex(obj => obj.id == id);
        if (index >= 0){
          if (operation == 'sum'){
            addedProducts[index].quantity += 1;
            addedProducts[index].priceUpdated = addedProducts[index].quantity * addedProducts[index].standardPrice; 
          }
          else if (operation == 'sub' && addedProducts[index].quantity>1){
            addedProducts[index].quantity -= 1;
            addedProducts[index].priceUpdated = addedProducts[index].quantity * addedProducts[index].standardPrice; 
          }
          localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
        }
      }
      
      const handleRemoveProduct = (id) => {
        const newProducts = addedProducts.filter((obj)=>(obj.id != id));
        setAddedProducts(newProducts);
        localStorage.setItem("addedProducts", JSON.stringify(newProducts));
      }

    return(
        <ShoppingCartContext.Provider value={{addedProducts, handleProducts, handleQuantityProducts, handleRemoveProduct}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
