import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) =>{
    const [addedProducts, setAddedProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem("addedProducts");
        if (storedProducts) {
            setAddedProducts(JSON.parse(storedProducts));
        }
    }, []);

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
                  price: product.price,
                  category: product.category,
                  id: product.id,
                },
              ];
              localStorage.setItem("addedProducts", JSON.stringify(newProducts));
              return newProducts;
            });
        }
      };
      

    return(
        <ShoppingCartContext.Provider value={{addedProducts, handleProducts}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
