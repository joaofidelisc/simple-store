import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar.js';
import ProductCard from '../../components/ProductCard.js';

function Products(){
    const [products, setProducts] = useState([]);
    const [receivedProducts, setReceivedProducts] = useState(false);

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json)).catch(err=>console.log(err));
    });

    return(
        <div>
        <NavBar/>
            {
                products.map((product)=>(
                    <div key={product.id}>
                        <ProductCard title={product.title} imgsrc={product.image} description={product.description} price={product.price} category={product.category}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Products;