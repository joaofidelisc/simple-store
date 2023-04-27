import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar.js';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShoppingCartCard from '../../components/ShoppingCartCard/ShoppingCartCard.js';
import ResumeCard from '../../components/ResumeCard/ResumeCard.js';
import ShoppingCartImage from '../../assets/shopping-cart-screen.svg';
import { updateTotalPriceFromStorage } from '../../redux/slices/shoppingCartSlice.js';
import { updateAppliedCouponsFromStorage } from '../../redux/slices/shoppingCartSlice.js';


function ShoppingCart(){   
    const [thereIsProduct, setThereIsProduct] = useState(false);
    const [couponText, setCouponText] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addedProducts = useSelector(state => state.shoppingCart.addedProducts);
    const totalPrice = useSelector(state => state.shoppingCart.totalPrice);
    
    const couponsAvailable = useSelector(state => state.shoppingCart.couponsAvailable);
    const appliedCoupons = useSelector(state => state.shoppingCart.appliedCoupons);
    
    const applyCoupon = () =>{
        if (!appliedCoupons.includes(couponText.toUpperCase()) && couponsAvailable.includes(couponText.toUpperCase())){
            //pode aplicar
            dispatch(updateTotalPriceFromStorage(totalPrice*0.8));
            dispatch(updateAppliedCouponsFromStorage(couponText));
        }else if(appliedCoupons.includes(couponText.toUpperCase())){
            //cupom já aplicado
            console.log('Você já aplicou esse cupom!');
        }else{
            //cupom inválido
            console.log('cupom inválido');
        }
    }

    useEffect(() => {
        console.log('cupons disponíveis:', couponsAvailable);
        console.log('cupons aplicados:', appliedCoupons);
        if (totalPrice > 0)
            setThereIsProduct(true);
        else
            setThereIsProduct(false);
    }, [addedProducts]);

    return(
        <>      
            <NavBar/>
            {
                thereIsProduct &&
                <div className='mx-auto'>
                    <div className='row'>
                        <div className='col-8'>
                            {
                                addedProducts.map((product)=>(
                                    <div key={product.id} className='div-products'>
                                        <ShoppingCartCard title={product.title} imgsrc={product.imgsrc} description={product.description} price={product.priceUpdated} category={product.category} id={product.id} quantity={product.quantity}/>
                                    </div>

                                ))
                            }
                        </div>
                        <div className='col-3 div-products'>
                            <ResumeCard price={totalPrice}/>
                        </div>
                        <div className='row g-2'>
                            <form className="d-flex justify-content-between align-items-center">
                                <div className='mb-2 col-md-6'>
                                    <input 
                                        type='text' 
                                        placeholder='Digite o seu cupom de desconto' 
                                        className='form-control' 
                                        id='cupom' 
                                        maxLength={5}
                                        onChange={e=>setCouponText(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 col-md-6'>
                                    <button className='btn btn-primary' onClick={(e)=>{e.preventDefault(); applyCoupon();}}>
                                        Aplicar cupom
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                !thereIsProduct &&
                <div className="d-flex justify-content-center align-items-center card-wrapper">
                    <div className="text-center">
                        <h2>Que pena, o carrinho está vazio!</h2>
                        <h3>Vamos conhecer nossos produtos?</h3>
                        <Button 
                            variant="primary" 
                            className='mt-4'
                            onClick={()=>navigate('/purchase/products')}
                        >
                            Ir para produtos 
                        </Button>
                    </div>
                    <img src={ShoppingCartImage} alt="BackgroundShoppingCart" className="img-fluid p-5" style={{width: "60%", height: "60%"}} />
                </div>
            }
        </>
    )
}

export default ShoppingCart;