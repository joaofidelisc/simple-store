import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, registeredUser } from '../../redux/slices/userSlice';
import { useForm } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import './signUp.css';

function SignUp(){
    const [thereIsCurrentUser, setThereIsCurrentUser] = useState(true);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    
    const users = useSelector(state => state.user.users);
    const currentUser = useSelector(state => state.user.currentUser);
    const password = watch("password", "");

    const toastHandler = (message) =>{
        toast.error(`${message}`, {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    const userExists = (email) => {
        return users.findIndex((user) => user.email === email);
    }

    const onSubmit = (data) => {
        const thereIsUser = userExists(data.email);
        console.log('thereIsUser', thereIsUser);
        if (thereIsUser==-1){
            dispatch(addUser({name: data.name, email:data.email, password:data.password, birthdate: data.birthdate, cpf: data.cpf}));
            navigate('/login');
        }else{
            toastHandler('Usuário já cadastrado');
        }
    }
    
    useEffect(()=>{
        if (currentUser.length > 0)
            navigate('/purchase/products');
        else
            setThereIsCurrentUser(false);
    }, []);
    
    return(
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary signup-container'>
            <div className='form_container p-5 rounded bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='text-center'>Cadastre-se</h3>
                    <div className='mb-2'>
                        <label htmlFor='text'>Nome</label>
                        <input
                            id='name'
                            {...register("name",{
                                required: "Preencha o nome",
                            })}
                            placeholder='Digite o seu nome'
                            type='text'
                            className='form-control'
                        />
                    </div>
                    {errors.name && <span style={{color:'red'}} role="alert">{errors.name.message}</span>}
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email' 
                            {...register("email", {
                                required: "Preencha o email",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email inválido"
                                }
                            })} 
                            placeholder='Digite o seu email' 
                            type='email'
                            className='form-control'
                        />
                        {errors.email && <span style={{color:'red'}} role="alert">{errors.email.message}</span>}
                    </div>
                    <div className="row g-2">
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='password'>Senha</label>
                            <input
                                id="password"
                                {...register("password", {
                                    required: "Preencha a senha",
                                    minLength: {
                                        value: 5,
                                        message: "O tamanho mínimo é de 5 caracteres"
                                    }
                                })}
                                placeholder='Digite sua senha' 
                                type="password"
                                className='form-control'
                                />
                            {errors.password && <span style={{color:'red'}} role="alert">{errors.password.message}</span>}
                        </div>
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='password'>Confirme sua senha</label>
                            <input
                                id="confirmedPassword"
                                {...register("confirmedPassword", {
                                    required: "Preencha a senha",
                                    minLength: {
                                        value: 5,
                                        message: "O tamanho mínimo é de 5 caracteres"
                                    },
                                    validate: value =>
                                        value === password || "Senhas diferentes"
                                })}
                                placeholder='Digite novamente' 
                                type="password"
                                className='form-control'
                            />
                            {errors.confirmedPassword && <span style={{color:'red'}} role="alert">{errors.confirmedPassword.message}</span>}
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='birthdate'>Data de Nascimento</label>
                            <input
                                id='birthday'
                                {...register("birthday", {
                                    required: "Selecione a data",
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        const ageDiffMs = today - selectedDate;
                                        const ageDate = new Date(ageDiffMs); 
                                        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                                        
                                        if (selectedDate > today) {
                                            return "A data de nascimento não pode ser maior que a data atual.";
                                        }
                                        
                                        if (age < 16) {
                                            return "Você deve ter mais de 16 anos.";
                                        }
                                    }
                                })}
                                placeholder='dd/mm/yyyy'
                                type='date'
                                className='form-control'
                            />
                        {errors.birthday && <span style={{color:'red'}} role="alert">{errors.birthday.message}</span>}
                        </div>
                        <div className='mb-2 col-md-6'>
                            <label htmlFor='cpf'>CPF</label>
                            <input
                                id='cpf'
                                {...register("cpf", {
                                    required: "Digite o CPF",
                                })}
                                placeholder='000.000.000-00'
                                type='text'
                                className='form-control'
                                maxLength={14}
                            />
                        {errors.cpf && <span style={{color:'red'}} role="alert">{errors.cpf.message}</span>}
                        </div>
                    </div>
                    <div className='d-grid mt-2'>
                        <button className='btn btn-primary'>
                            Cadastrar
                        </button>
                    </div>
                </form>
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>

            </div>
        </div>
    )
}

export default SignUp;