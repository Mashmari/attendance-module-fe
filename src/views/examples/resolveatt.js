// this js file is for the page Student Roster.
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [schoolNameFilter, setSchoolNameFilter] = useState("");
  const [classNameFilter, setClassNameFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const pageSize = 10;

  const toggleErrorModal = () => setErrorModal(!errorModal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/mamSchoolStudent/get`, {
          params: {
            page: currentPage,
            limit: pageSize,
          },
        });

        if (response.data && Array.isArray(response.data.students)) {
          setStudents(response.data.students);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setStudents([]);
          setTotalPages(1);
        }
      } catch (error) {
        setError(error.message);
        setErrorMessage("Something went wrong. Please try again later.");
        setErrorModal(true); // Show the error modal
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredStudents = students.filter((student) => {
    return (
      (schoolNameFilter === "" || student.School_Name === schoolNameFilter) &&
      (classNameFilter === "" || student.Class_Name === classNameFilter) &&
      (studentNameFilter === "" || student.StudentName.toLowerCase().includes(studentNameFilter.toLowerCase()))
    );
  });

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
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

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 style={{ color: "#50085e" }}>Student Roster</h1>
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
                    {Array.from(new Set(students.map((student) => student.School_Name))).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Input>
                  <Input
                    type="select"
                    value={classNameFilter}
                    onChange={(e) => setClassNameFilter(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    <option value="">All Class Names</option>
                    {Array.from(new Set(students.map((student) => student.Class_Name))).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
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
              <CardBody style={{ padding: "0rem" }}>
                <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd" }}>
                  <Table className="align-items-center table-flush custom-table" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ width: "15%", textAlign: "left", color: "purple" }}>
                          School Name
                        </th>
                        <th scope="col" style={{ width: "15%", textAlign: "left", color: "purple" }}>
                          Class Name
                        </th>
                        <th scope="col" style={{ width: "15%", textAlign: "center", color: "purple" }}>
                          Student ID
                        </th>
                        <th scope="col" style={{ width: "15%", textAlign: "left", color: "purple" }}>
                          Name
                        </th>
                        <th scope="col" style={{ width: "15%", textAlign: "center", color: "purple" }}>
                          Image Filename
                        </th>
                        <th scope="col" style={{ width: "20%", textAlign: "center", color: "purple" }}>
                          Created on
                        </th>
                        <th scope="col" style={{ width: "15%", textAlign: "left", color: "purple" }}>
                          Location ID
                        </th>
                      </tr>
                    </thead>
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
                            No data available
                          </td>
                        </tr>
                      ) : filteredStudents.length > 0 ? (
                        filteredStudents.map((item) => (
                          <tr key={item.Student_ID}>
                            <td style={{ width: "10%", padding: "8px" }}>{item.School_Name}</td>
                            <td style={{ width: "10%", padding: "8px" }}>{item.Class_Name}</td>
                            <td style={{ width: "10%", padding: "8px", textAlign: "center" }}>{item.Student_ID}</td>
                            <td style={{ width: "15%", padding: "8px", textAlign: "left" }}>{item.StudentName}</td>
                            <td style={{ width: "15%", padding: "8px", textAlign: "center" }}>{item.Ref_Image_filename}</td>
                            <td style={{ width: "15%", padding: "8px", textAlign: "center" }}>
                              {formatDate(item.Ref_Image_Create_DateTime)}
                            </td>
                            <td style={{ width: "10%", padding: "8px", textAlign: "center" }}>{item.Location_ID}</td>
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
                <Pagination className="justify-content-end mt-3">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem active={index + 1 === currentPage} key={index}>
                      <PaginationLink onClick={() => handlePageClick(index + 1)}>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Error Modal */}
    
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

export default SchoolImageData;
