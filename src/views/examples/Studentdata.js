

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

const Studentdata = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolNameFilter, setSchoolNameFilter] = useState("");
  const [classNameFilter, setClassNameFilter] = useState("");
  const [locationIdFilter, setLocationIdFilter] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/mamschool/get"
        );
        setStudents(response.data);
      } catch (error) {
        console.log("Wrong link implemented");
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    return (
      (schoolNameFilter === "" || student.School_Name === schoolNameFilter) &&
      (classNameFilter === "" || student.Class_Name === classNameFilter) &&
      (locationIdFilter === "" || student.Location_ID === locationIdFilter)
    );
  });

  const pageCount = Math.ceil(filteredStudents.length / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const slicedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-2">
                <div className="text-muted text-center mt-2 mb-2">
                  <h1>School Data</h1>
<<<<<<< Updated upstream
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <Input
                    type="select"
                    value={schoolNameFilter}
                    onChange={(e) => setSchoolNameFilter(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    <option value="">All School Names</option>
                    {Array.from(new Set(students.map(student => student.School_Name))).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </Input>
                  <Input
                    type="select"
                    value={classNameFilter}
                    onChange={(e) => setClassNameFilter(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    <option value="">All Class Names</option>
                    {Array.from(new Set(students.map(student => student.Class_Name))).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </Input>
                  <Input
                    type="select"
                    value={locationIdFilter}
                    onChange={(e) => setLocationIdFilter(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    <option value="">All Location IDs</option>
                    {Array.from(new Set(students.map(student => student.Location_ID))).map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </Input>
=======
>>>>>>> Stashed changes
                </div>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                style={{ width: "100%" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ width: "10%", color: "purple" }}>
                      School ID
                    </th>
                    <th scope="col" style={{ width: "20%", color: "purple" }}>
                      School Name
                    </th>
                    <th scope="col" style={{ width: "10%", color: "purple" }}>
                      Class ID
                    </th>
                    <th scope="col" style={{ width: "20%", color: "purple" }}>
                      Class Name
                    </th>
                    <th scope="col" style={{ width: "20%", color: "purple" }}>
                      API User ID
                    </th>
                    <th scope="col" style={{ width: "20%", color: "purple" }}>
                      Location ID
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#f9f9f9" }}>
                  {slicedStudents.map((student) => (
                    <tr key={student.API_User_ID}>
                      <td style={{ whiteSpace: "nowrap" }}>{student.School_ID}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{student.School_Name}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{student.Class_ID}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{student.Class_Name}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{student.API_User_ID}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{student.Location_ID}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="justify-content-end mt-3">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    onClick={() => handlePageClick(currentPage - 1)}
                  />
                </PaginationItem>
                {[...Array(pageCount)].map((_, index) => (
                  <PaginationItem
                    active={index + 1 === currentPage}
                    key={index}
                  >
                    <PaginationLink onClick={() => handlePageClick(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === pageCount}>
                  <PaginationLink
                    next
                    onClick={() => handlePageClick(currentPage + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Studentdata;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
