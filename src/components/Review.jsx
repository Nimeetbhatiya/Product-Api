/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';


function Review(props) {
  let [star, setStar] = useState([1, 2, 3, 4, 5]);
  let [activestar, setActiveStar] = useState(-1);
  let [review, setReview] = useState({});
  let [allReview, setAllReview] = useState([]);

  useEffect(() => {

    getReviews();
  }, [setAllReview]);

  let getReviews = async () => {
    let productReview = await fetch("http://localhost:3000/reviews/?productId="
      + props.productId);

    let data = await productReview.json();
    setAllReview(data);
  };
  console.log(allReview);
  let getInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setReview({ ...review, [name]: value });
  };

  let addReview = async (e) => {
    e.preventDefault();
    let obj = { ...review, ["star"]: activestar, productId: props.productId }
    console.log(obj);
    let addRe = await fetch("http://localhost:3000/reviews", {
      method: "post",
      body: JSON.stringify(obj),
    });
    toast.success("Review Added");
    getReviews();

  };
  return (
    <Container>
      <h2>Reviews</h2>
      <Row>
        <Col>
          <form method="post" onSubmit={(e) => addReview(e)}>
            {star.map((v, i) => {
              return <FaStar onMouseOver={() => setActiveStar(i + 1)}
                style={{ color: activestar > i ? "yellow" : "" }} />
            })} ||
            <button  type='button' onClick={() => setActiveStar(-1)}>Reset</button>
            <br />
            <textarea name="description" placeholder='Add Comment' onChange={(e) => getInput(e)}></textarea>
            <br />
            <Button type="submit">Add Review</Button>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>

          {allReview.map((v, i) => {
            return (
              <div>
                {v.star > 0 && [...Array(v.star)].map((v, i) => {
                  return <FaStar style={{ color: 'yellow' }} />;
                })}
                <p>{v.description}</p>
              </div>
            )
          })}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default Review
