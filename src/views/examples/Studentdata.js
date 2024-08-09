

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
        const response = await axios.get("http://localhost:8080/api/mamschool/get");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
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
            <Card className="bg-secondary shadow border-0" style={{ height: '600px', overflow: 'hidden' }}>
              <CardHeader className="bg-transparent pb-2">
                <div className="text-muted text-center mt-2 mb-2">
                  <h1 style={{ color: '#50085e' }}>School Data</h1>
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
                </div>
              </CardHeader>
              <div style={{ height: 'calc(100% - 68px)', overflowY: 'auto', width: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    width: '100%',
                    overflowX: 'hidden'
                  }}>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                      style={{ marginBottom: 0, borderSpacing: '0', borderCollapse: 'collapse', tableLayout: 'fixed' }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            School ID
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            School Name
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            Class ID
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            Class Name
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            Location ID
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", textAlign: 'left', padding: '8px' }}>
                            API User ID
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                  <div style={{ width: '100%' }}>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                      style={{ marginBottom: 0, borderSpacing: '0', borderCollapse: 'collapse', tableLayout: 'fixed' }}
                    >
                      <tbody style={{ backgroundColor: "#f9f9f9" }}>
                        {slicedStudents.map((student) => (
                          <tr key={student.API_User_ID}>
                            <td style={{ whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', padding: '8px' }}>{student.School_ID}</td>
                            <td style={{ whiteSpace: "normal", wordWrap: 'break-word', textAlign: 'left', padding: '8px' }}>{student.School_Name}</td>
                            <td style={{ whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', padding: '8px' }}>{student.Class_ID}</td>
                            <td style={{ whiteSpace: "normal", wordWrap: 'break-word', textAlign: 'left', padding: '8px' }}>{student.Class_Name}</td>
                            <td style={{ whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', padding: '8px' }}>{student.Location_ID}</td>
                            <td style={{ whiteSpace: "normal", wordWrap: 'break-word', textAlign: 'left', padding: '8px' }}>{student.API_User_ID}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <Pagination className="justify-content-end mt-3">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
                </PaginationItem>
                {[...Array(pageCount)].map((_, index) => (
                  <PaginationItem active={index + 1 === currentPage} key={index}>
                    <PaginationLink onClick={() => handlePageClick(index + 1)}>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === pageCount}>
                  <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
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


