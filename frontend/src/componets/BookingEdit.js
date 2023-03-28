import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import FormContainer from ".//FormContainer";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

const BookingEdit= () => {
  const params = useParams();
  const Navigate = useNavigate();
  const userId = params.id;
  const [booking_id, setBooking_id] = useState();
  const [location_id, setLocation_id] = useState();
  const [drone_shot_id, setDrone_shot_id] = useState();
  const [createdTime, setCreatedTime] = useState();


  useEffect(() => {
    axios.get(`/api/booking/${userId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setBooking_id(res.data.booking_id);
        setLocation_id(res.data.location_id);
        setDrone_shot_id(res.data.drone_shot_id);
        setCreatedTime(res.data.createdTime);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // console.log("hello");

    axios.put(`/api/booking/edit/${userId}`, {
       booking_id,location_id,drone_shot_id,createdTime
    })
      .then((res) => {
        console.log(res);
        Navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  return (
    <>
      <Link
        to="/"
        className="btn btn-light my-3"
        // style={{
        //   backgroundColor: Colors.orange,
        //   ,
        //   fontWeight: "bold",
        // }}
      >
        Go Back
      </Link>
      <FormContainer>
        <Typography variant="h4" style={{marginBottom:'1.5em',color:"#61dafb"}}>Edit Booking</Typography>
     
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" style={{ marginBottom: "1em" }}>
            <Form.Label style={{}}>Booking Id</Form.Label>
            <Form.Control
              type="booking_id"
              placeholder="Enter Booking Id"
              value={booking_id}
              onChange={(e) => setBooking_id(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Email Location Id</Form.Label>
            <Form.Control
              type="location_id"
              placeholder="Enter Location Id"
              value={location_id}
              onChange={(e) => setLocation_id(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phoneNo" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Drone shot id</Form.Label>
            <Form.Control
              type="drone_shot_id"
              placeholder="Enter Drone shot id"
              value={drone_shot_id}
              onChange={(e) => setDrone_shot_id(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phoneNo" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Created Time</Form.Label>
            <Form.Control
              type="createdTime"
              placeholder="Enter createdTime"
              value={createdTime}
              onChange={(e) => setCreatedTime(e.target.value)}
            ></Form.Control>
          </Form.Group>

            <Button type="submit" variant="primary" style={{}}>
              Update
            </Button>
          </Form>
  
      </FormContainer>
    </>
  );
};

export default BookingEdit;

