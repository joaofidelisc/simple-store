import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function ResumeCard({price}) {
    return (
        <Card className="d-flex justify-content-center align-items-center" style={{ width: '25em', height: '20em' }}>
            <div className="text-center">
                <Card.Title>Resumo</Card.Title>
                <Card.Text>Valor dos produtos: {price.toFixed(2)}</Card.Text>
                <Button 
                    variant="primary" 
                    className='mt-4'
                    // onClick={()=>navigate('/purchase/products')}
                >
                    Ir para o pagamento
                </Button>
            </div>
        </Card>
    );
}

export default ResumeCard;
