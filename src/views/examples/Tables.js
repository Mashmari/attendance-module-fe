
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

  const getData = async (page = 1, limit = 10) => {
    const response = await axios.get(`http://localhost:8080/mam/get?page=${page}&limit=${limit}`);
    if (response.data.records.length !== 0) {
      const studentsWithImages = await Promise.all(
        response.data.records.map(async (student) => {
          const imageResponse = await axios.get('http://localhost:8080/image', {
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

  const filteredStudents = students.filter((student) => {
    if (statusFilter && student.match_outcome !== statusFilter) return false;
    const studentDate = new Date(student.Upload_timestamp).toDateString();
    if (startDate && studentDate < new Date(startDate).toDateString()) return false;
    if (endDate && studentDate > new Date(endDate).toDateString()) return false;
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Positive":
        return "green";
      case "Negative":
        return "yellow";
      case "Spoof":
        return "red";
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
                    <th scope="col" style={{ color: '#50085e' }}>Student Id</th>
                    <th scope="col" style={{ color: '#50085e' }}>Status</th>
                    <th scope="col" style={{ color: '#50085e' }}>Date & Time</th>
                    <th scope="col" style={{ color: '#50085e' }}>Location</th>
                    <th scope="col" style={{ color: '#50085e' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
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
                            Mashmari School
                          </span>
                        </Media>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            {student.id}
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
                      <td>
                        ({formatCoordinates(student.Latitude)}, {formatCoordinates(student.Longitude)})
                      </td>
                      <td className="text-right">
                        <div className="text-center">
                          {student.match_outcome === "Spoof" ? (
                            <i
                              className="fas fa-times"
                              style={{
                                color: "red",
                                fontSize: "24px",
                                marginTop: "16px",
                              }}
                            ></i>
                          ) : student.match_outcome === "Negative" && student.Status_Pending === "Yes" ? (
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
    </>
  );
};

export default Tables;
