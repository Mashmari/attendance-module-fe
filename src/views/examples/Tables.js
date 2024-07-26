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
import Header from "components/Headers/Header.js";
import axios from "axios";
import { Link } from "react-router-dom";

const Tables = () => {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Records");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  async function getData(page = 1, limit = 10) {
    const response = await axios.get(`http://localhost:8080/api/mamAttendance/get?page=${page}&limit=${limit}`);
    console.log(response);
    if (response.data.records.length !== 0) {
      setStudents(response.data.records);
      setTotalPages(response.data.totalPages);
    }
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, statusFilter]);

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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
                    <th scope="col">Student Id</th>
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
                            {student.id}
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
                           <
                           Link to=
                           {
                           `/admin/resolveimg?id=${
                           student.id
                           }&timestamp=${
                           formatTimestamp(student.Upload_timestamp)
                           }&imagePath=${
                           encodeURIComponent(student.Image_storage_path)
                           }`
                           }
                           >
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
    </>
  );
};

export default Tables;
