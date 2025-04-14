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
    <Container>
        <h1 style={{ textAlign : "center"}}>Product Details</h1>
      <Row>
        <Col>
          <img src={product.image} height={300} />
        </Col>
        <Col> 
        <h3>{product.title}</h3>
        <p>{product.category}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button><Link></Link></button>
        </Col>
      </Row>
      <Review productId={prodata.productId}/>
      
    </Container>
  )
}

export default ProductDetails;
