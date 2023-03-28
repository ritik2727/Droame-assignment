import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";

import { Link ,useNavigate} from "react-router-dom";

import {Button, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";

export default function Booking() {
    const [bookings, setBookings] = useState();

  const navigate = useNavigate();
 
  const getData = async () => {
    const response = await axios.get(
      "/api/booking/getAll"
    );

    const bookingsData = response.data.booking;
    console.log(bookingsData);

    setBookings(
      bookingsData.map((i) => {
        return (
          <Tbody style={{ backgroundColor: "white" }}>
            <Tr>
              <Td>{i.booking_id}</Td>
              <Td>{i.location_id}</Td>
              <Td>{i.drone_shot_id}</Td>
              <Td>{i.createdTime}</Td>
              <Td>
                <Link to={`/booking/${i._id}/edit`}>
                  <Button variant="success" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteBooking(i._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        );
      })
    );
  };
  const deleteBooking = (id) => {
    return fetch(`/api/booking/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        getData();
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  const createProductHandler = () => {
    //   CREATE PRODUCT
  
 navigate('/booking/create');
    // dispatch(createProduct());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Row className="align-items-center" style={{ marginBottom: "1.5em" }}>
        <Col>
          <Typography variant="h4" style={{color:'white'}}>Bookings</Typography>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={createProductHandler}
            style={{ backgroundColor: "#61dafb" }}
          >
            <i className="fas fa-plus"></i> Create Bookings
          </Button>
        </Col>
      </Row>
      <Table style={{ fontSize: 16 }}>
        <Thead style={{ backgroundColor: "#61dafb" }}>
          <Tr>
            <Th style={{ fontWeight: "bold", fontSize: 20 }} >Booking Id</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Location Id</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Drone Shot Id</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Created Time</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Action</Th>

          </Tr>
        </Thead>
        {bookings}
      </Table>
    </div>
  );
}
