import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { updateTotalPrice, updateAppliedCouponsFromStorage } from '../../redux/slices/shoppingCartSlice';
import { addPaymentMethod } from '../../redux/slices/userSlice';

function ResumeCard({price}) {
    const [couponText, setCouponText] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const totalPrice = useSelector(state => state.shoppingCart.totalPrice);
    const appliedCoupons = useSelector(state => state.shoppingCart.appliedCoupons);
    const couponsAvailable = useSelector(state => state.shoppingCart.couponsAvailable);

    const toastHandler = (message, status) =>{
        if (status === 'success')
            toast.success(`${message}`, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        else
            toast.error(`${message}`, {
                position: toast.POSITION.BOTTOM_LEFT
            });
    }
    
    const applyCoupon = () =>{
        console.log('appliedCoupons', appliedCoupons);
        if (couponText){
            if (!appliedCoupons.includes(couponText.toUpperCase()) && couponsAvailable.includes(couponText.toUpperCase())){
                // dispatch(updateTotalPrice(totalPrice*0.85));
                dispatch(updateAppliedCouponsFromStorage(couponText));
                toastHandler('Opa, cupom de desconto ativado!', 'success')
            }else{
                toastHandler('Cupom inválido, expirado ou já utilizado', 'failed')
            }
        }
    }

    const onSubmit = (data) => {
        dispatch(addPaymentMethod(data.paymentMethod))
        navigate('/purchase/payment');
    }

    return (
        <Card className="container justify-content-center" >
            <div className="text-center">
                <Card.Title className='mt-2'>RESUMO</Card.Title>
                    <div className="total-price" style={{border: "2px solid #E5FFF1", padding: "5px", display: "inline-block", marginLeft: "10px", width: '60%', backgroundColor: '#E5FFF1'}}>
                    <Card.Text style={{ color: '#1F9050', fontWeight: 'bold' }}>Valor total dos produtos</Card.Text>
                    <Card.Text style={{ fontWeight: 'bold', color:'#15723e' }}>{`R$ ${price.toFixed(2)}`}</Card.Text>
                    </div>
                <hr/>
                    <Card.Text>Qual o método de pagamento?</Card.Text>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select 
                            id='paymentMethod'
                            {...register("paymentMethod", {
                                required: "Selecione um método!"
                            })}
                            aria-label="Método de pagamento" 
                            className="form-select" 
                        >
                            <option value="">Escolha o método de pagamento</option>
                            <option value="cartao">Cartão</option>
                            <option value="pix">PIX</option>
                            <option value="boleto">Boleto</option>
                        </select>
                        {errors.paymentMethod && <span style={{color:'red'}} role="alert">{errors.paymentMethod.message}</span>}
                        <div>
                            <button 
                                className='btn btn-primary block mt-2'
                                style={{backgroundColor: 'white', color:'#0B5ED7'}}
                            >
                                Finalizar compra
                            </button>
                        </div>
                    </form>
                <hr/>
                <div>
                    <Button 
                        variant="primary" 
                        className='mt-4'
                        onClick={()=>navigate('/purchase/products')}
                    >
                        Continuar comprando
                    </Button>
                    <hr/>
                </div>
                <form className="d-flex justify-content-between align-items-center mb-2">
                    <div className='mb-2 col-md-6'>
                        <input 
                            type='text' 
                            placeholder='Insira um cupom' 
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
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
            </div>
        </Card>
    );
}

export default ResumeCard;
