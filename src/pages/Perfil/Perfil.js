import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/userSlice';

import NavBar from '../../components/NavBar';

import './perfil.css';

function Perfil(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const handleLogout = () =>{
        dispatch(logoutUser());
        navigate('/');
    }


    return(
        <>
            <NavBar/>
            <Card className="container justify-content-center mt-4" >
            <div className="text-center">
                <Card.Title className='mt-2'>Olá usuário, você está logado!</Card.Title>
                <div>
                    <Button 
                        variant="primary mb-4" 
                        className='mt-4'
                        onClick={handleLogout}
                    >
                        Sair
                    </Button>
                </div>                
            </div>
        </Card>
        </>
    )
}

export default Perfil;