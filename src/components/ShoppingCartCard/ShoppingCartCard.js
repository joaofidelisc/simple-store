import React, {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';

function ShoppingCartCard({title, imgsrc, description, price, category, id, quantity}) {
  const {addedProducts, _, handleQuantityProducts, handleRemoveProduct} = useContext(ShoppingCartContext);

  const [priceUpdated, setPriceUpdated] = useState(price);
  const [quantityUpdated, setQuantityUpdated] = useState(quantity);

  return (
    <Card className="d-flex justify-content-center align-items-center" style={{ width: '70em', height: '15em' }}>
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
                onClick={()=>{
                  handleQuantityProducts(id, 'sub');
                  const index = addedProducts.findIndex(obj => obj.id == id);
                  setQuantityUpdated(addedProducts[index].quantity);
                  setPriceUpdated(addedProducts[index].priceUpdated);
                }}
              >
                -
              </Button>
              <Card.Text style={{fontSize: '1.5rem'}}>{quantityUpdated}</Card.Text>
              <Button 
                variant="primary" 
                style={{maxWidth: '5%'}}
                onClick={()=>{
                  handleQuantityProducts(id, 'sum');
                  const index = addedProducts.findIndex(obj => obj.id == id);
                  setQuantityUpdated( addedProducts[index].quantity);
                  setPriceUpdated(addedProducts[index].priceUpdated);
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
              handleRemoveProduct(id);
            }}
          >
            <span className="align-middle">Remover</span>
          </Button>
        </div>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center" style={{padding: '1rem'}}>
          <Card.Text style={{fontSize: '1.5rem'}}>R${priceUpdated.toFixed(2)}</Card.Text>
        </div>
      </div>
    </Card>
  );
}

export default ShoppingCartCard;
