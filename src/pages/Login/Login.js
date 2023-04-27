import React from 'react';

import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/login-screen-background.svg';

import './login.css';

function Login(){

    const navigate = useNavigate();
    
    return(
        <div className='d-flex justify-content-center align-items-center vh-100 bg-primary login-container' style={{overflow: 'hidden'}}>
            <div className="col-md-6">
                <img src={LoginImage} alt="BackgroundLogin" className="img-fluid p_5"/>
            </div>
            <div className='form_container p-5 rounded bg-white'>

                <form>
                    <h3 className='text-center'>Login</h3>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Digite o seu email' className='form-control'/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' placeholder='Digite sua senha' className='form-control'/>
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-control custom-checkbox' id='check'/>
                        <label htmlFor='check' className='custom-input-label ms-2'>
                            Lembrar-me
                        </label>
                    </div>
                    <div className='d-grid mt-2 mb-2'>
                        <button className='btn btn-primary' onClick={()=>navigate('/purchase/products')}>Entrar</button>
                    </div>
                    <p className='text-center'>
                        <a href=''>Esqueci minha senha</a>
                    </p>
                    <p className='text-center'>
                        Ainda não tem uma conta? <a href='' onClick={()=>navigate('/signup')}>Cadastre-se</a>
                    </p>
                </form>
            </div>
        </div>
    )
}


export default Login;



