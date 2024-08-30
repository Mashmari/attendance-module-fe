// // // // this js file is for School Data page.



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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

const Studentdata = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolNameFilter, setSchoolNameFilter] = useState("");
  const [classNameFilter, setClassNameFilter] = useState("");
  const [locationIdFilter, setLocationIdFilter] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const pageSize = 10;

  const toggleErrorModal = () => setErrorModal(!errorModal);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mamschool/get");
        setStudents(response.data);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.");
        setErrorModal(true);
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

  const cellStyle = {
    padding: '8px',
    textAlign: 'left',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

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
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
                            School ID
                          </th>
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
                            School Name
                          </th>
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
                            Class ID
                          </th>
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
                            Class Name
                          </th>
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
                            Location ID
                          </th>
                          <th scope="col" style={{ ...cellStyle, width: "20%", color: "purple" }}>
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
                            <td style={cellStyle}>{student.School_ID}</td>
                            <td style={cellStyle}>{student.School_Name}</td>
                            <td style={cellStyle}>{student.Class_ID}</td>
                            <td style={cellStyle}>{student.Class_Name}</td>
                            <td style={cellStyle}>{student.Location_ID}</td>
                            <td style={cellStyle}>{student.API_User_ID}</td>
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
            OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Studentdata;
