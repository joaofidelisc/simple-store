import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../components/NavBar.js';

import { ShoppingCartContext } from '../../context/ShoppingCartContext.js';

function ShoppingCart(){
    const [products, setProducts] = useState([]);
    const [isThereProduct, setIsThereProduct] = useState(null);
    
    const {addedProducts, _} = useContext(ShoppingCartContext);
    useEffect(()=>{
        if (addedProducts){
            setProducts(addedProducts);
        }
    }, [addedProducts]);
    
    return(
        <div>
            <NavBar/>
            Carrinho de compras 
            {
                products.map((product)=>(
                    <div key={product.id}>
                        {product.title} - {product.price}
                    </div>
                ))
            }
        </div>
    )
}

export default ShoppingCart;