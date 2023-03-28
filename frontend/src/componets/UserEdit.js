import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import FormContainer from ".//FormContainer";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

const UserEdit = () => {
  const params = useParams();
  const Navigate = useNavigate();
  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [phoneNo, setPhoneNo] = useState();

  useEffect(() => {
    axios
      .get(`/api/users//userById/${userId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhoneNo(res.data.phoneNo);
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log("hello");

    axios
      .put(`/api/users/update/${userId}`, {
        name: name,
        email: email,
        phoneNo: phoneNo,
        isAdmin: isAdmin,
      })
      .then((res) => {
        console.log(res);
        Navigate("/users");
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
        <Typography variant="h4" style={{ marginBottom: "1.5em" ,color:'#61dafb'}}>
          Edit User
        </Typography>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phoneNo" style={{ marginBottom: "1em" }}>
            <Form.Label style={{color:'white'}}>Phone Number</Form.Label>
            <Form.Control
              type="phoneNo"
              placeholder="Enter Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin" style={{ marginBottom: "1em" }}>
            <Form.Check
              style={{color:'white'}}
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary" style={{}}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEdit;
