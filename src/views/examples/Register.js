/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
               <h1>Enter Student Details</h1> 
            </div>
            <div className="text-center">
              {/* <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button> */}
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              {/* ÷\<small>Or sign up with credentials</small> */}
            </div>
            <Form role="form">
              <FormGroup>
                {/* Image Field (Coming from Database) */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="imageField"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Image:
</label>
<img
        src="path_to_image.jpg"
        alt="Student Image"
        id="imageField"
        style={{
          flex: 2,
          maxWidth: 150,
          height: "auto",
          border: "1px solid #ccc",
          borderRadius: 5
        }}
      />
</div>
    {/* First Name */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="firstName"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        First Name:
</label>
<input
        type="text"
        id="firstName"
        name="firstName"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
        required=""
      />
</div>
    {/* Last Name */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="lastName"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Last Name:
</label>
<input
        type="text"
        id="lastName"
        name="lastName"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
        required=""
      />
</div>
    {/* Class */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="class"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Class:
</label>
<input
        type="text"
        id="class"
        name="class"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
    {/* Date of Birth */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="dob"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Date of Birth:
</label>
<input
        type="date"
        id="dob"
        name="dob"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
    {/* Student ID */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="studentId"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Student ID:
</label>
<input
        type="text"
        id="studentId"
        name="studentId"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
    {/* Phone Number */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="phone"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Phone Number:
</label>
<input
        type="tel"
        id="phone"
        name="phone"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
        placeholder="123-456-7890"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      />
</div>
    {/* School */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="school"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        School:
</label>
<input
        type="text"
        id="school"
        name="school"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
    {/* Image Clicked On */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="imageClickedOn"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Image Clicked On:
</label>
<input
        type="date"
        id="imageClickedOn"
        name="imageClickedOn"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
    {/* Location */}
<div style={{ marginBottom: 15, display: "flex", alignItems: "center" }}>
<label
        htmlFor="location"
        style={{ flex: 1, marginRight: 10, color: "purple", fontWeight: "bold" }}
>
        Location:
</label>
<input
        type="text"
        id="location"
        name="location"
        style={{
          flex: 2,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3
        }}
      />
</div>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button">
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
