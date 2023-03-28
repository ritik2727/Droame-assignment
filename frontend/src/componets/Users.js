import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const deleteUser = (id) => {
    return fetch(`/api/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("cds");
        getData();
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  const getData = async () => {
    const resonse = await axios.get("/api/users/allUsers");
    const usersData = resonse.data;
    console.log("ok", usersData);
    setUsers(
      usersData.map((i) => {
        return (
          <Tbody style={{ backgroundColor: "white" }}>
            <Tr>
              <Td>{i.name}</Td>
              <Td>{i.email}</Td>
              <Td>{i.phoneNo}</Td>
              <Td>
                <Link to={`/user/${i._id}/edit`}>
                  <Button variant="success" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteUser(i._id)}
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
  const createProductHandler = () => {
    //   CREATE PRODUCT

    navigate("/user/create");
    // dispatch(createProduct());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Row className="align-items-center" style={{ marginBottom: "1.5em" }}>
        <Col>
          <Typography variant="h4" style={{ color: "white" }}>
            Users
          </Typography>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={createProductHandler}
            style={{ backgroundColor: "#61dafb" }}
          >
            <i className="fas fa-plus"></i> Create Users
          </Button>
        </Col>
      </Row>
      <Table style={{ fontSize: 16 }}>
        <Thead style={{ backgroundColor: "#61dafb" }}>
          <Tr>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Name</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Email</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>PhoneNo</Th>
            <Th style={{ fontWeight: "bold", fontSize: 20 }}>Action</Th>
          </Tr>
        </Thead>
        {users}
      </Table>
    </div>
  );
}
