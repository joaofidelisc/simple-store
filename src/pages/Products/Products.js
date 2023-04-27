import React, { useState, useEffect, useContext } from 'react';

import NavBar from '../../components/NavBar.js';
import ProductCard from '../../components/ProductCard/ProductCard.js';

import './products.css';

function Products(){
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json)).catch(err=>console.log(err));
    }, []);
        
    return(
        <div>
            <NavBar/>
            <div className='div-wrapper'>
                {
                    products.map((product)=>(
                        <div key={product.id} className='div-products'>
                            <ProductCard title={product.title} imgsrc={product.image} description={product.description} price={product.price} category={product.category} id={product.id}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products;