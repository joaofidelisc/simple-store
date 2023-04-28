import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../../components/NavBar';
import { checkout } from '../../redux/slices/shoppingCartSlice';


function Payment() {
    const [couponText, setCouponText] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const totalPrice = useSelector(state => state.shoppingCart.totalPrice);
    const paymentMethod = useSelector(state => state.user.paymentMethod);
    
    const handleCheckout = () =>{
        dispatch(checkout());
        navigate('/purchase/products');
    }

    return (
        <>
        <NavBar/>
        <Card className="container justify-content-center mt-4" >
            <div className="text-center">
                <Card.Title className='mt-2'>RESUMO</Card.Title>
                    <div className="total-price" style={{border: "2px solid #E5FFF1", padding: "5px", display: "inline-block", marginLeft: "10px", width: '60%', backgroundColor: '#E5FFF1'}}>
                    <Card.Text style={{ color: '#1F9050', fontWeight: 'bold' }}>Valor pago</Card.Text>
                    <Card.Text style={{ fontWeight: 'bold', color:'#15723e' }}>{`R$ ${totalPrice.toFixed(2)}`}</Card.Text>
                    </div>
                <hr/>
                    <Card.Title className='mt-2'>Método de pagamento</Card.Title>
                    <Card.Text>{paymentMethod}</Card.Text>
                    <Card.Text>Obrigado por escolher a gente!</Card.Text>
                <div>
                    <Button 
                        variant="primary mb-4" 
                        className='mt-4'
                        onClick={handleCheckout}
                    >
                        Finalizar
                    </Button>
                </div>                
            </div>
        </Card>
        </>
    );
}

export default Payment;
