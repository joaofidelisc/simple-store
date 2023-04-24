import React from 'react';

import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


import './home.css';

import HomeImage from '../../assets/home-image.svg';

function Home() {
  const navigate = useNavigate();
  return (
    <Container className="container-home">
        <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6">
                <img src={HomeImage} alt="HomeImage"/>
            </div>
            <div className="col-md-6">
                <h1 className="text-center">Dev's store</h1>
                <h2 className="mb-5 text-center">A loja do programador, a sua loja!</h2>

                <h3 className="mb-4 text-center">O que você deseja?</h3>
                <div className="buttons-wrapper text-center">
                    <Button type="submit" className='mb-3 bg-custom' onClick={()=>navigate('/login')}>
                        Fazer Login
                    </Button>
                    <Button variant="secondary" type="submit" className='mb-3' onClick={()=>navigate('/signup')}>
                        Cadastrar-se
                    </Button>
                </div>
            </div>
        </div>
    </Container>
  );
}

export default Home;

