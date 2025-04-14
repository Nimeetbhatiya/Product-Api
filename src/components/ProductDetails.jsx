import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import Review from './Review';
import { Link } from 'react-router-dom';

function ProductDetails() {
    let prodata = useParams();
    let [product , setProduct] = useState({});

    useEffect(() =>  {
        let getProduct = async () => {
        let details = await fetch ("http://localhost:3000/products/" + prodata.productId)
        let data = await details.json();
        setProduct(data);
        };
        getProduct();
    }, [setProduct]);
  return (
    <Container className="py-5">
  <h1 className="text-center mb-5">Product Details</h1>
  <Row className="align-items-center g-5">
    <Col md={6} className="text-center">
      <img 
        src={product.image} 
        alt={product.title} 
        height="300" 
        className="img-fluid rounded shadow-sm"
        style={{ objectFit: "contain", maxHeight: "400px" }}
      />
    </Col>
    <Col md={6}>
      <h3 className="mb-3">{product.title}</h3>
      <p className="text-muted mb-2">{product.category}</p>
      <h4 className="text-success mb-4">₹ {product.price}</h4>
      <p className="lead" style={{ fontSize: "1.1rem" }}>{product.description}</p>
      
      <Link to="/" className="btn btn-primary mt-3">
        Back to Products
      </Link>
    </Col>
  </Row>

  <hr className="my-5" />

  <Review productId={prodata.productId} />
</Container>

  )
}

export default ProductDetails;
