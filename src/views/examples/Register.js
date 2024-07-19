

import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  return (
    <>
      <Col lg="6" md="4" className="mx-auto">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-2 mb-2">
               <h1>Login Information</h1> 
            </div>
          </CardHeader>
          <CardBody className="px-lg-2 py-lg-2">
            <Form role="form">
              <FormGroup className="mb-3">
                <label
                  htmlFor="username"
                  style={{ color: "purple", fontWeight: "bold" }}
                >
                  Username:
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  style={{
                    padding: 8,
                    border: "1px solid #ccc",
                    borderRadius: 3,
                  }}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label
                  htmlFor="password"
                  style={{ color: "purple", fontWeight: "bold" }}
                >
                  Password:
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  style={{
                    padding: 8,
                    border: "1px solid #ccc",
                    borderRadius: 3,
                  }}
                  required
                />
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <small>
                Don't have an account? <Link to="/user-creation">Sign up</Link>
              </small>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;

