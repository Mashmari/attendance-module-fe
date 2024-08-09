
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Spinner,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import moment from "moment";

const SchoolImageData = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schoolNameFilter, setSchoolNameFilter] = useState("");
  const [classNameFilter, setClassNameFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/mamSchoolStudent/get", {
          params: {
            page: currentPage,
            limit: pageSize,
          },
        });

        if (response.data && Array.isArray(response.data.images)) {
          setStudents(response.data.images);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setStudents([]);
          setTotalPages(1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredStudents = students.filter(student => {
    return (
      (schoolNameFilter === "" || student.School_Name === schoolNameFilter) &&
      (classNameFilter === "" || student.Class_Name === classNameFilter) &&
      (studentNameFilter === "" || student.StudentName.toLowerCase().includes(studentNameFilter.toLowerCase()))
    );
  });

  const pageCount = Math.ceil(filteredStudents.length / pageSize);

  const handlePageClick = (page) => {
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateTimeString) => {
    const formattedDate = moment(dateTimeString).format("DD/MM/YYYY");
    const formattedTime = moment(dateTimeString).format("hh:mm A");
    return (
      <>
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </>
    );
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
                <div className="d-flex justify-content-between align-items-center">
                  <h1 style={{ color: '#50085e' }}>Student Roster</h1>
                  <Button color="primary" href="/admin/addstudent" style={{ marginLeft: "15px" }}>
                    Add Student
                  </Button>
                </div>
                <div className="d-flex justify-content-between mb-3 mt-3">
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
                    type="text"
                    placeholder="Search by Student Name"
                    value={studentNameFilter}
                    onChange={(e) => setStudentNameFilter(e.target.value)}
                    style={{ width: "30%" }}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ padding: '0rem' }}>
                <div
                  style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    position: 'relative',
                    border: '1px solid #ddd',
                  }}
                >
                  <div
                    style={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#f8f9fa',
                      zIndex: 1,
                    }}
                  >
                    <Table
                      className="align-items-center table-flush custom-table"
                      responsive
                      style={{ marginTop: '0rem', borderCollapse: 'collapse' }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" style={{ width: "10%", color: "purple", whiteSpace: 'normal', textAlign: 'left' }}>
                            School Name
                          </th>
                          <th scope="col" style={{ width: "15%", color: "purple", whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>
                            Class Name
                          </th>
                          <th scope="col" style={{ width: "13%", color: "purple", whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>
                            Student ID
                          </th>
                          <th scope="col" style={{ width: "15%", color: "purple", textAlign: 'left' }}>
                            Name
                          </th>
                          <th scope="col" style={{ width: "10%", color: "purple", whiteSpace: 'normal', textAlign: 'left' }}>
                            Image Filename
                          </th>
                          <th scope="col" style={{ width: "10%", color: "purple", whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>
                            Create Date & Time
                          </th>
                          <th scope="col" style={{ width: "20%", color: "purple", whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>
                            Location ID
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                  <div>
                    <Table
                      className="align-items-center table-flush custom-table"
                      responsive
                      style={{ marginTop: '0rem', borderCollapse: 'collapse', marginBottom: 0, borderSpacing: '0', borderCollapse: 'collapse', tableLayout: 'fixed' }}
                    >
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner type="grow" color="primary" />
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="7" className="text-center text-danger">
                              {error}
                            </td>
                          </tr>
                        ) : slicedStudents.length > 0 ? (
                          slicedStudents.map((item) => (
                            <tr key={item.Student_ID}>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '4px' }}>{item.School_Name}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '4px' }}>{item.Class_Name}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '4px' }}>{item.Student_ID}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '6px' }}>{item.StudentName}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '4px' }}>{item.Ref_Image_filename}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '8px' }}>{formatDate(item.Ref_Image_Create_DateTime)}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left', padding: '4px' }}>{item.Location_ID}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <Pagination className="justify-content-end mt-3">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePageClick(currentPage - 1)}
                    />
                  </PaginationItem>
                  {pageCount > 0 &&
                    [...Array(pageCount)].map((_, index) => (
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
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SchoolImageData;
