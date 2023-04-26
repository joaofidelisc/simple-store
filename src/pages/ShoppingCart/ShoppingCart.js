import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../components/NavBar.js';

import ShoppingCartCard from '../../components/ShoppingCartCard/ShoppingCartCard.js';
import { ShoppingCartContext } from '../../context/ShoppingCartContext.js';

function ShoppingCart(){   
    const {addedProducts, handleProducts_, handleQuantityProducts, handleRemoveProduct} = useContext(ShoppingCartContext);

    return(
        <div>
            <NavBar/>
            {
                addedProducts.map((product)=>(
                    <div key={product.id} className='div-products'>
                        <ShoppingCartCard title={product.title} imgsrc={product.imgsrc} description={product.description} price={product.priceUpdated} category={product.category} id={product.id} quantity={product.quantity}/>
                    </div>

                ))
            }
        </div>
    )
}

export default ShoppingCart;