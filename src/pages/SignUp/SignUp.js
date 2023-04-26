import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './signup.css';

function SignUp(){
    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [cpf, setCPF] = useState(null);


    return(
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary' style={{overflow: 'hidden'}}>
            <div className='form_container p-5 rounded bg-white'>
                <form>
                    <h3 className='text-center'>Cadastre-se</h3>
                    <div className='mb-2'>
                        <label htmlFor='text'>Nome</label>
                        <input type='text' placeholder='Digite o seu nome' className={name != 'invalid' ? 'form-control':'form-control is-invalid'} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Digite o seu email' className='form-control' onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="row g-2">
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='password'>Senha</label>
                            <input type='password' placeholder='Digite sua senha' className='form-control' onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='password'>Confirme sua senha</label>
                            <input type='password' placeholder='Digite novamente' className='form-control' onChange={(e)=> setConfirmedPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='birthdate'>Data de Nascimento</label>
                            <input type='date' placeholder='dd/mm/yyyy' className='form-control' id='birthdate' onChange={(e)=> setBirthday(e.target.value)}/>
                        </div>
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='cpf'>CPF</label>
                            <input type='text' pattern='[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}' placeholder='000.000.000-00' className='form-control' id='cpf' maxLength={14} onChange={(e)=> setCPF(e.target.value)}/>
                        </div>
                    </div>
                    <div className='d-grid mt-2'>
                        <button className='btn btn-primary' 
                            onClick={()=>{
                                // if (name === null || name === '') {
                                //     setName('invalid');
                                // }
                                navigate('/purchase/products');
                            }}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;