import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({title, imgsrc, description, price, category}) {
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img variant="top" src={imgsrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;