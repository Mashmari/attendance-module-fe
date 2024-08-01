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
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import moment from "moment";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SchoolImageData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const schoolResponse = await axios.get("http://localhost:8080/api/mamSchoolStudent/get");
        const classResponse = await axios.get("http://localhost:8080/api/mamSchoolStudent/get");

        setSchoolOptions(schoolResponse.data.map(school => ({
          value: school.School_Name,
          label: school.School_Name,
        })));
        
        setClassOptions(classResponse.data.map(cls => ({
          value: cls.Class_Name,
          label: cls.Class_Name,
        })));
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/mamSchoolStudent/get",
          {
            params: {
              page: currentPage,
              limit: pageSize,
              school: selectedSchool?.value || '',
              class: selectedClass?.value || '',
              studentName: studentSearch,
              date: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : '',
            },
          }
        );

        if (response.data && Array.isArray(response.data.images)) {
          setData(response.data.images);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setData([]);
          setTotalPages(1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedSchool, selectedClass, studentSearch, selectedDate]);

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
                <div className="text-muted text-center mt-2 mb-2">
                  <h1>School Image Data</h1>
                </div>
              </CardHeader>
              <CardBody style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '200px' }}>
                    <Select
                      options={schoolOptions}
                      onChange={setSelectedSchool}
                      placeholder="Select School"
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: '100%',
                        }),
                      }}
                    />
                  </div>
                  <div style={{ width: '200px' }}>
                    <Select
                      options={classOptions}
                      onChange={setSelectedClass}
                      placeholder="Select Class"
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: '100%',
                        }),
                      }}
                    />
                  </div>
                  <div style={{ width: '200px' }}>
                    <Input
                      type="text"
                      placeholder="Search for student name"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ width: '200px' }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      placeholderText="Select Date"
                      className="form-control"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <Table className="align-items-center table-flush" responsive style={{ marginTop: '2rem' }}>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ width: "8%", color: "purple" }}>
                        School Name
                      </th>
                      <th scope="col" style={{ width: "8%", color: "purple" }}>
                        Class Name
                      </th>
                      <th scope="col" style={{ width: "10%", color: "purple" }}>
                        Student ID
                      </th>
                      <th scope="col" style={{ width: "10%", color: "purple" }}>
                        Name
                      </th>
                      <th scope="col" style={{ width: "10%", color: "purple" }}>
                        Image Filename
                      </th>
                      <th scope="col" style={{ width: "15%", color: "purple" }}>
                        Create Date & Time
                      </th>
                      <th scope="col" style={{ width: "8%", color: "purple" }}>
                        Location ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="7" className="text-center text-danger">
                          {error}
                        </td>
                      </tr>
                    ) : data.length > 0 ? (
                      data.map((item) => (
                        <tr key={item.Student_ID}>
                          <td>{item.School_Name}</td>
                          <td>{item.Class_Name}</td>
                          <td>{item.Student_ID}</td>
                          <td>{item.StudentName}</td>
                          <td>{item.Ref_Image_filename}</td>
                          <td>{formatDate(item.Ref_Image_Create_DateTime)}</td>
                          <td>{item.Location_ID}</td>
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
                <Pagination className="justify-content-end mt-3">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePageClick(currentPage - 1)}
                    />
                  </PaginationItem>
                  {totalPages > 0 &&
                    [...Array(totalPages)].map((_, index) => (
                      <PaginationItem
                        active={index + 1 === currentPage}
                        key={index}
                      >
                        <PaginationLink onClick={() => handlePageClick(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem disabled={currentPage === totalPages}>
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
