/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';



function UpdateProduct() {
    let [category, setCategory] = useState([]);
    let [product, setProduct] = useState({});
    let prodata = useParams();
    let navigate = useNavigate();

    useEffect(() => {
       
        getCategory();
        getSingleProductDetails();

    },[setCategory, setProduct]);

    let getSingleProductDetails = async() => {
        let productDetails = await fetch("http://localhost:3000/products/"+prodata.productId);
        let details = await productDetails.json();
        setProduct(details)

    }

    let getCategory = async() => {
        let getCatData = await fetch("https://fakestoreapi.com/products/categories");
        let cateData = await getCatData.json();
        setCategory(cateData);
    }

        let getInput = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            setProduct({...product,[name]:value});
        };

        let submitData = async (e) => {
            e.preventDefault();
            console.log(product)
            await fetch("http://localhost:3000/products/"+prodata.productId,{
                method:"put",
                body: JSON.stringify(product),
            });

            toast.success("product update successfully");

            setTimeout(() => {
                navigate("/");
            },5000);
        }
    return (
        <Container>
            <Row style={{ width: "500px", margin: "0 auto" }}>
                <Col>
                    <Form onSubmit={(e) => submitData(e)} method='post'>
                        <h1 style={{ textAlign : "center"}}>Update Product</h1>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Category
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select aria-label="Default select example"
                                 name="category"
                                 onChange={(e) => getInput(e)}
                                 >
                                    <option value="">---Select Category---</option>
                                    {category.map((v,i) => {
                                        return(
                                     <option value={v} selected={v==product.category ? "selected" : ""}>{v}</option>
                                    )
                                    })}
                                    
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Title
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type='text' name='title' value={product.title ? product.title : ""} onChange={(e) => getInput(e)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" name='price' value={product.price ? product.price : ""} onChange={(e) => getInput(e)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" rows={3} name='description' value={product.description ? product.description : ""} onChange={(e) => getInput(e)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Image
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name='image' value={product.image ? product.image : ""} onChange={(e) => getInput(e)} />
                            </Col>
                            {/* <img src={product.image ? product.image : ""} height={100} width={100} /> */}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"></Form.Label>
                            <Col sm="10">
                                    <Button type='submit'>Update Product</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>  
            <ToastContainer/>
        </Container>
    )
}

export default UpdateProduct;
