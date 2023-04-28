import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FirstImage from '../../assets/first-screen-background.svg';
import './first.css';


function First(){
    const [thereIsCurrentUser, setThereIsCurrentUser] = useState(true);

    const navigate = useNavigate();
    
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(()=>{
        if (currentUser.length > 0)
            navigate('/purchase/products');
        else
            setThereIsCurrentUser(false);
    }, []);

    return(
        <div className='d-flex justify-content-center align-items-center vh-100 bg-primary login-container' style={{overflow: 'hidden'}}>
            {
                !thereIsCurrentUser &&
                <>
                    <div className="col-md-6">
                        <img src={FirstImage} alt="BackgroundFirst" className="img-fluid p_5"/>
                    </div>
                    <div className='form_container p-5 rounded bg-white'>
                        <form>
                            <h3 className='text-center mb-4'>DEV'S STORE</h3>
                            <h4 className='text-center mb-4'>A loja do programador!</h4>
                        
                            <div className='d-grid mt-2 mb-2'>
                                <button className='btn btn-primary' onClick={()=>navigate('/login')}>Entrar</button>
                            </div>
                            <div className='d-grid mt-2 mb-2'>
                                <button className='btn btn-secondary' onClick={()=>navigate('/signup')}>Cadastrar-se</button>
                            </div>
                            
                        </form>
                    </div>
                </>
            }
        </div>
    )
}


export default First;



