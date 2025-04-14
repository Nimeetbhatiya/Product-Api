import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Product() {
  let [product, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [setProducts]);

  let getProducts = async () => {
    try {
      let data = await fetch("http://localhost:3000/products");
      let records = await data.json();
      setProducts(records);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  let deleteProductData = async (id) => {
    // eslint-disable-next-line no-unused-vars
    let deleteData = await fetch("http://localhost:3000/products/" + id, {
      method: "delete",
    });
    getProducts();
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        {product.map((v) => {
          return (
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={v.image} height="120px" />
                <Card.Body>
                  <Card.Title>{v.title}</Card.Title>
                  <Card.Text> {v.description.slice(0, 90)}</Card.Text>
                  <Card.Text> {Math.ceil(v.price * 80)}</Card.Text>

                  
                  <Button variant="primary" style={{margin:"0px 5px"}}
                    onClick={() => deleteProductData(v.id)}>Delete</Button> 

                    <Link to={"/UpdateProduct/"+v.id}>
                    <Button>Update</Button>
                    </Link>

                    <Link to={"/ProductDetails/"+v.id}><Card.Text>View More</Card.Text></Link>

                </Card.Body>
              </Card>
            </Col>
          )
        })}

      </Row>
    </Container>
  )
}

export default Product
