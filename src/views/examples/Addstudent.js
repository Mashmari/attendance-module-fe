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
import { useNavigate } from "react-router-dom"; // Update import to useNavigate

const AddStudent = () => {
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the list of distinct schools on component mount
    axios
      .get("http://localhost:8080/api/mamSchoolStudent/getAllSchoolNames")
      .then((response) => {
        const data = response.data.schools;
        setSchools(data);
      })
      .catch((error) => {
        toast.error("Failed to fetch school names.");
        console.error("Error fetching school names:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      axios
        .post("http://localhost:8080/api/mamSchoolStudent/getClassesBySchoolName", {
          School_Name: selectedSchool,
        })
        .then((response) => {
          const data = response.data.classes;
          setClasses(data);
        })
        .catch((error) => {
          toast.error("Failed to fetch class names.");
          console.error("Error fetching class names:", error);
        });
    } else {
      setClasses([]); // Clear classes if no school is selected
    }
  }, [selectedSchool]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedSchool || !selectedClass || !StudentName || !image) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    setLoading(true); // Set loading to true when submitting
  
    const formData = new FormData();
    formData.append("School_Name", selectedSchool);
    formData.append("Class_Name", selectedClass);
    formData.append("StudentName", StudentName);
    formData.append("image", image);
  
    axios
      .post("http://localhost:8080/api/mamSchoolStudent/createStudentWithImage", formData)
      .then((response) => {
        toast.success("Student added successfully!");
        // Clear form fields on success
        setSelectedSchool("");
        setSelectedClass("");
        setStudentName("");
        setImage(null);
        setPreview("");
  
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/resolveatt"); // Redirect to /admin/resolveatt using useNavigate
        }, 3000);
      })
      .catch((error) => {
        toast.error("Failed to add student.");
        console.error("Error adding student:", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
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
                            disabled={loading} // Disable button when loading
                          >
                            Choose File
                          </Button>
                          <Input
                            type="file"
                            id="studentImage"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            disabled={loading} // Disable input when loading
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
                          disabled={loading} // Disable select when loading
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
                          disabled={!selectedSchool || loading} // Disable select when no school is selected or loading
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
                          value={StudentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          disabled={loading} // Disable input when loading
                        />
                      </FormGroup>
                      <Button color="primary" type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Student"}
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
