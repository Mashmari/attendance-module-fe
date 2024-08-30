//this js file is for Daily Attendance page.
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tables = () => {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // Set default to current date
  const [endDate, setEndDate] = useState(new Date()); // Set default to current date
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
    const [errorModal, setErrorModal] = useState(false);  // Error modal state
    const [errorMessage, setErrorMessage] = useState("");  // Error message state
  //  const getData = async (page = 1, limit = 10) => {
  
  const getData = async (page = 1, limit = 10) => {
 try {
    const response = await axios.get(`http://localhost:8080/mam/get?page=${page}&limit=${limit}`);
    if (response.data.records.length !== 0) {
      const studentsWithImages = await Promise.all(
        response.data.records.map(async (student) => {
          const imageResponse = await axios.get(`http://localhost:8080/image`, {
            params: { path: student.imageUrl },
            responseType: 'blob',
          });
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...student, imageUrl };
        })
      );
      setStudents(studentsWithImages);
      setTotalPages(response.data.totalPages);
    }
} catch (error) {
  setErrorMessage("Something went wrong. Please try again.");
  setErrorModal(true);  // Trigger error modal on error
}
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, statusFilter, startDate, endDate]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB").split("-").join("");
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const formatCoordinates = (value) => {
    return value.toFixed(6);
  };


  const getDateOnly = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };
  
  const filteredStudents = students.filter((student) => {
    if (statusFilter && student.match_outcome.toLowerCase() !== statusFilter.toLowerCase()) return false;
  
    const studentDate = getDateOnly(student.Upload_timestamp);
    const startDateOnly = startDate ? getDateOnly(startDate) : null;
    const endDateOnly = endDate ? getDateOnly(endDate) : null;
  
    if (startDateOnly && studentDate < startDateOnly) return false;
    if (endDateOnly && studentDate > endDateOnly) return false;
  
    return true;
  });
  
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleModal = (imageUrl = "") => {
    setModalImage(imageUrl);
    setModal(!modal);
  };
const toggleErrorModal = () => {
  setErrorModal(!errorModal);
};

 
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "positive":
        return "green";
      case "negative":
        return "red";
      case "spoof":
        return "orange";
      default:
        return "";
    }
  };
  

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="text-muted text-center mt-2 mb-2">
                  <h1 style={{ color: '#50085e' }}>Daily Attendance</h1>
                </div>
                <Row className="mb-3" style={{ marginTop: "20px" }}>
                  <Col md="3">
                    <Input
                      type="select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ width: "100%" }}
                    >
                      <option value="">All Status</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                      <option value="Spoof">Spoof</option>
                    </Input>
                  </Col>
                  <Col md="3" style={{ position: "relative" }}>
                    <label style={{
                      position: "absolute",
                      top: "-10px",
                      left: "20px",
                      fontSize: "0.85rem",
                      color: "#50085e",
                      zIndex: 1,
                      background: "white",
                      padding: "0 5px"
                    }}>
                      Start Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select Start Date"
                      className="form-control"
                      maxDate={new Date()}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col md="3" style={{ position: "relative" }}>
                    <label style={{
                      position: "absolute",
                      top: "-10px",
                      left: "20px",
                      fontSize: "0.85rem",
                      color: "#50085e",
                      zIndex: 1,
                      background: "white",
                      padding: "0 5px"
                    }}>
                      End Date
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select End Date"
                      className="form-control"
                      maxDate={new Date()}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ color: '#50085e' }}>Image</th>
                    <th scope="col" style={{ color: '#50085e' }}>School Name</th>
                    <th scope="col" style={{ color: '#50085e' }}>Class Name</th>
                    <th scope="col" style={{ color: '#50085e' }}>Student Id</th>
                    <th scope="col" style={{ color: '#50085e' }}>Status</th>
                    <th scope="col" style={{ color: '#50085e' }}>Captured on</th>
                    <th scope="col" style={{ color: '#50085e' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.Matched_User_ID}>
                      <td>
                        <Media className="align-items-center">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={student.imageUrl}
                              alt="Image"
                              id="imageField"
                              style={{
                                maxWidth: 75,
                                height: "auto",
                                border: "1px solid #ccc",
                                borderRadius: 5,
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.2)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                              onClick={() => toggleModal(student.imageUrl)}
                            />
                          </div>
                        </Media>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                          {student.School_Name}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                          {student.Class_Name}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            {student.Matched_User_ID}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4" style={{ color: getStatusColor(student.match_outcome) }}>
                          {/* <i className="bg-" /> */}
                          {/* warning */}
                          {student.match_outcome}
                        </Badge>
                      </td>
                      <td>
                        {formatTimestamp(student.Upload_timestamp)}
                      </td>
              
                      <td className="text-right">
  <div className="text-center">
    {student.match_outcome.toLowerCase() === "spoof" ? (
      <i
        className="fas fa-times"
        style={{
          color: "red",
          fontSize: "24px",
          marginTop: "16px",
        }}
      ></i>
    ) : student.match_outcome.toLowerCase() === "negative" && student.Status_Pending === "Yes" ? (
      <Link to={`/admin/resolveimg?id=${student.id}&timestamp=${formatTimestamp(student.Upload_timestamp)}&imagePath=${student.imageUrl}`}>
        <Button
          className="mt-4"
          color="primary"
          type="button"
        >
          Resolve
        </Button>
      </Link>
    ) : (
      <i
        className="fas fa-check"
        style={{
          color: "green",
          fontSize: "24px",
          marginTop: "16px",
        }}
      ></i>
    )}
  </div>
</td>

                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={currentPage <= 1}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {[...Array(totalPages).keys()].map((page) => (
                      <PaginationItem active={page + 1 === currentPage} key={page}>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page + 1);
                          }}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage >= totalPages}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} className="border-0"></ModalHeader>
        <ModalBody>
          <img src={modalImage} alt="Modal" style={{ width: "100%" }} />
        </ModalBody>
      </Modal>

<Modal isOpen={errorModal} toggle={toggleErrorModal} centered>
  <ModalHeader 
    toggle={toggleErrorModal} 
    style={{ color: '#50085e', fontWeight: 'bold', borderBottom: '2px ' }}
  >
    <i 
      className="fas fa-exclamation-triangle" 
      style={{ color: '#50085e', marginRight: '10px' }} 
    ></i>
    Error
  </ModalHeader>
  <ModalBody style={{ textAlign: 'center', fontSize: '1.2rem', padding: '30px 20px' }}>
    <i 
      className="fas fa-exclamation-circle" 
      style={{ color: '#ff6347', fontSize: '3rem', marginBottom: '20px' }}
    ></i>
    <div>{errorMessage}</div>
  </ModalBody>
  <ModalFooter style={{ justifyContent: 'center', borderTop: '2px solid #fff' }}>
    <Button 
      color="primary" 
      onClick={toggleErrorModal} 
      style={{ backgroundColor: '#50085e', borderColor: '#50085e', padding: '10px 20px' }}
    >
      OK
    </Button>
  </ModalFooter>
</Modal>

    </>
  );
};

 export default Tables;






