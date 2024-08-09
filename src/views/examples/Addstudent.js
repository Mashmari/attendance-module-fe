
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Container,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentName, setStudentName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/mamschool/get")
      .then((response) => {
        const data = response.data;
        setSchools(data.map((item) => item.School_Name));
        setClasses(data.map((item) => item.Class_Name));
      })
      .catch((error) => {
        toast.error("Failed to fetch school and class data.");
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSchool || !selectedClass || !studentName || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("schoolName", selectedSchool);
    formData.append("className", selectedClass);
    formData.append("studentName", studentName);
    formData.append("image", image);

    axios
      .post(
        "http://localhost:8080/api/mamSchoolStudent/createStudentWithImage",
        formData
      )
      .then((response) => {
        toast.success("Student added successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add student.");
      });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader
                className="bg-white border-0"
                style={{ color: "#50085e", marginBottom: "-10px" }} // Reduced marginBottom
              >
                <div className="text-muted text-center mt-2 mb-2">
                  <h1 style={{ color: '#50085e', marginBottom: "0" }}>Add Student</h1>
                </div>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="studentImage" style={{ color: '#50085e' }}>Upload Image</Label>
                        <div
                          style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            textAlign: "center",
                            backgroundColor: "#f8f9fa",
                          }}
                        >
                          {preview && (
                            <img
                              src={preview}
                              alt="Selected"
                              style={{
                                width: "100%",
                                marginBottom: "15px",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                          <Button
                            color="primary"
                            onClick={() =>
                              document.getElementById("studentImage").click()
                            }
                          >
                            Choose File
                          </Button>
                          <Input
                            type="file"
                            id="studentImage"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="8">
                      <FormGroup>
                        <Label for="schoolSelect" style={{ color: "#50085e" }}>
                          School Name
                        </Label>
                        <Input
                          type="select"
                          id="schoolSelect"
                          value={selectedSchool}
                          onChange={(e) => setSelectedSchool(e.target.value)}
                        >
                          <option value="" disabled>
                            Select School
                          </option>
                          {schools.map((school, index) => (
                            <option key={index} value={school}>
                              {school}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="classSelect" style={{ color: "#50085e" }}>
                          Class Name
                        </Label>
                        <Input
                          type="select"
                          id="classSelect"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Class
                          </option>
                          {classes.map((cls, index) => (
                            <option key={index} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="studentName" style={{ color: "#50085e" }}>
                          Student Name
                        </Label>
                        <Input
                          type="text"
                          id="studentName"
                          placeholder="Enter student name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                      </FormGroup>
                      <Button color="primary" type="submit">
                        Add Student
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default AddStudent;
