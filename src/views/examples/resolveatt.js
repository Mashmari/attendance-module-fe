import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import moment from "moment";

const SchoolImageData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

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
            },
          }
        );

        console.log("Full API Response:", response);
        console.log("API Response Data:", response.data);

        if (response.data && Array.isArray(response.data.images)) {
          setData(response.data.images);
          setTotalPages(response.data.totalPages || 1);
        } else {
          console.log("Unexpected response structure:", response.data);
          setData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ width: "8%", color: "purple" }}>
                      School ID
                    </th>
                    <th scope="col" style={{ width: "8%", color: "purple" }}>
                      Class ID
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
                        <td>{item.School_ID}</td>
                        <td>{item.Class_ID}</td>
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SchoolImageData;
