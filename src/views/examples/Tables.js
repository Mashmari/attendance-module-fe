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
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

const Tables = () => {
  const [show, setShow] = useState(true);
  const [students, setStudents] = useState([]);

  async function getData() {
    const response = await axios.get("http://localhost:3000/mam");
    console.log(response);
    if (response.data.length !== 0) {
      setStudents(response.data);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
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
                    <th scope="col">Name of Student</th>
                    <th scope="col">Status</th>
                    <th scope="col">Timestamp & Location</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <th scope="row">
                        <td>
                          <Media className="align-items-center">
                            <div
                              style={{
                                marginBottom: 15,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <label
                                htmlFor="imageField"
                                style={{
                                  flex: 1,
                                  marginRight: 10,
                                  color: "purple",
                                  fontWeight: "bold",
                                }}
                              ></label>
                              <img
                                src="path_to_image.jpg"
                                alt="Student Image"
                                id="imageField"
                                style={{
                                  flex: 2,
                                  maxWidth: 150,
                                  height: "auto",
                                  border: "1px solid #ccc",
                                  borderRadius: 5,
                                }}
                              />
                            </div>
                          </Media>
                        </td>
                      </th>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            {/* =====Response from API will come here==== */}
                            Raghav Verma
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
                        {/* =====Timestamp from the DB====== */}
                        {student.Upload_timestamp}
                        <br/>
                        ({student.Latitude},
                        {student.Longitude})
                      </td>
                      <td className="text-right">
                        <div className="text-center">
                          {student.match_outcome == "Fail" && (
                            <Button
                              className="mt-4"
                              color="primary"
                              type="button"
                              onClick={() => setShow((prev) => !prev)}
                            >
                              Add the student
                            </Button>
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
