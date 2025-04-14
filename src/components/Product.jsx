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
    <Container className="my-5">
  <h2 className="text-center mb-4">Our Products</h2>
  <Row className="g-4 justify-content-center">
    {product.map((v) => {
      return (
        <Col key={v.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Img variant="top" src={v.image} height="200px" style={{ objectFit: "contain" }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-truncate">{v.title}</Card.Title>
              <Card.Text className="text-muted small" style={{ flexGrow: 1 }}>
                {v.description.slice(0, 90)}...
              </Card.Text>
              <h5 className="text-primary mb-3">₹ {v.price}</h5>

              <div className="d-flex justify-content-between">
                <Button variant="danger" size="sm" onClick={() => deleteProductData(v.id)}>
                  Delete
                </Button>
                <Link to={"/UpdateProduct/" + v.id}>
                  <Button variant="warning" size="sm">Update</Button>
                </Link>
              </div>

              <Link to={"/ProductDetails/" + v.id} className="mt-3 btn btn-outline-primary btn-sm w-100">
                View More
              </Link>
            </Card.Body>
          </Card>
        </Col>
      );
    })}
  </Row>
</Container>

  )
}

export default Product
