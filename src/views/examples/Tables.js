
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
// import image from "../../assets/img/brand/WIN_20240713_11_29_25_Pro.jpg";
import { Link } from "react-router-dom";

const Tables = () => {
  const [show, setShow] = useState(true);
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Records");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  async function getData() {
    const response = await axios.get("http://localhost:8080/api/mam/get");
    console.log(response);
    if (response.data.length !== 0) {
      setStudents(response.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const hoverStyle = {
    transform: "scale(1.5)",
    transition: "transform 0.2s",
  };

  const normalStyle = {
    transition: "transform 0.2s",
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date
      .toLocaleDateString("en-GB")
      .split("-")
      .join("");
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
    if (statusFilter === "All Records") return true;
    return student.match_outcome === statusFilter;
  });

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Filter Dropdown */}
        <Row className="mb-3">
          <div className="col">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>Status: {statusFilter}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setStatusFilter("All Records")}>
                  All Records
                </DropdownItem>
                <DropdownItem onClick={() => setStatusFilter("Pass")}>
                  Pass
                </DropdownItem>
                <DropdownItem onClick={() => setStatusFilter("Fail")}>
                  Fail
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Row>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Total Students</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Location</th>
                    <th scope="col" />
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
                              src={student.Image_storage_path}
                              alt="Student Image"
                              id="imageField"
                              style={{
                                maxWidth: 75,
                                height: "auto",
                                border: "1px solid #ccc",
                                borderRadius: 5,
                                ...normalStyle,
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.2)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            />
                          </div>
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
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
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
                          {student.match_outcome === "Fail" && student.Status_Pending === "Yes" ? (
                            <Link to={`/admin/resolveimg?userID=${student.Matched_User_ID}&timestamp=${formatTimestamp(student.Upload_timestamp)}`}>
                              <Button
                                className="mt-4"
                                color="primary"
                                type="button"
                                onClick={() => setShow((prev) => !prev)}
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
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
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
    </>
  );
};

export default Tables;
