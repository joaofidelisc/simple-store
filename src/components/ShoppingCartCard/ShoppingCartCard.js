import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch } from 'react-redux';
import { updateQuantity, removeProduct } from '../../redux/slices/shoppingCartSlice';

function ShoppingCartCard({title, imgsrc, description, price, category, id, quantity}) {
  const dispatch = useDispatch();
  return (
    <Card className="d-flex justify-content-center align-items-center" style={{ width: '55em', height: '15em' }}>
      <div className="row align-items-center" style={{ height: '100%' }}>
        <div className="col-3 d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
          <Card.Img variant="top" src={imgsrc} style={{ objectFit: 'contain', height: '70%', maxHeight: '100%', width: 'auto' }}/>
        </div>
        <div className="col-3" style={{padding: '1rem'}}>
          <Card.Title style={{ height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Card.Title>
          <Card.Text style={{ maxHeight: '6rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{description}</Card.Text>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center" style={{padding: '1rem'}}>
          <div className="d-flex justify-content-between" style={{ width: '50%' }}>
            <div className="d-flex align-items-center justify-content-center">
              <Button 
                variant="primary" 
                style={{maxWidth: '2%'}}
                className="d-flex justify-content-center align-items-center"
                onClick={()=>{
                  dispatch(updateQuantity({id, operation:'sub'}));
                }}
                >
                -
              </Button>
              <div>
                <Card.Text className="text-center" style={{fontSize: '1.5rem', marginLeft: '0.5em', marginRight: '0.5em'}}>{quantity}</Card.Text>
              </div>
              <Button 
                variant="primary" 
                className="d-flex justify-content-center align-items-center"
                style={{maxWidth: '5%'}}
                onClick={()=>{
                  dispatch(updateQuantity({id, operation:'sum'}));
                }}
              >
                +
              </Button>
            </div>
          </div>
        <div>
          <Button 
            variant="danger" 
            onClick={()=>{
              dispatch(removeProduct(id));
            }}
            style={{marginLeft: '1.5em'}}
          >
            <span className="align-middle">Remover</span>
          </Button>
        </div>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center" style={{padding: '1rem'}}>
          <Card.Text style={{fontSize: '1.5rem'}}>R${price.toFixed(2)}</Card.Text>
        </div>
      </div>
    </Card>
  );
}

export default ShoppingCartCard;
