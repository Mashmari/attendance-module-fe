// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardHeader,
//   Table,
//   Container,
//   Row,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
// } from "reactstrap";
// import Header from "components/Headers/Header.js";
// import axios from "axios";
// import moment from "moment"; // Import moment library for date formatting

// const SchoolImageData = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/image/get");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const pageCount = Math.ceil(data.length / pageSize);

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const slicedData = data.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Function to format date to DD/MM/YYYY
//   const formatDate = (dateTimeString) => {
//     const formattedDate = moment(dateTimeString).format("DD/MM/YYYY");
//     const formattedTime = moment(dateTimeString, "HH:mm:ss").format("hh:mm A");
//     return (
//       <>
//         <div>{formattedDate}</div>
//         <div>{formattedTime}</div>
//       </>
//     );
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="bg-secondary shadow border-0">
//               <CardHeader className="bg-transparent pb-2">
//                 <div className="text-muted text-center mt-2 mb-2">
//                   <h1>School Image Data</h1>
//                 </div>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col" style={{ width: "8%", color: "purple" }}>School ID</th>
//                     <th scope="col" style={{ width: "8%", color: "purple" }}>Class ID</th>
//                     <th scope="col" style={{ width: "10%", color: "purple" }}>User ID</th>
//                     <th scope="col" style={{ width: "10%", color: "purple" }}>Name</th>
//                     <th scope="col" style={{ width: "10%", color: "purple" }}>Image
//                       <br/> Filename</th>
//                     <th scope="col" style={{ width: "15%", color: "purple" }}>Create Date
//                       <br/> Time</th>
//                     <th scope="col" style={{ width: "8%", color: "purple" }}>Location ID</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {slicedData.map((item) => (
//                     <tr key={item.School_ID}>
//                       <td>{item.School_ID}</td>
//                       <td>{item.Class_ID}</td>
//                       <td>{item.User_ID}</td>
//                       <td>{item.StudentName}</td>
//                       <td>{item.Ref_Image_filename}</td>
//                       <td>{formatDate(item.Ref_Image_Create_DateTime)}</td>
//                       <td>{item.School_Location_ID}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <Pagination className="justify-content-end mt-3">
//                 <PaginationItem disabled={currentPage === 1}>
//                   <PaginationLink
//                     previous
//                     onClick={() => handlePageClick(currentPage - 1)}
//                   />
//                 </PaginationItem>
//                 {[...Array(pageCount)].map((_, index) => (
//                   <PaginationItem active={index + 1 === currentPage} key={index}>
//                     <PaginationLink onClick={() => handlePageClick(index + 1)}>
//                       {index + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//                 <PaginationItem disabled={currentPage === pageCount}>
//                   <PaginationLink
//                     next
//                     onClick={() => handlePageClick(currentPage + 1)}
//                   />
//                 </PaginationItem>
//               </Pagination>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SchoolImageData;



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
import moment from "moment"; // Import moment library for date formatting

const SchoolImageData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/image/get", {
          params: {
            page: currentPage,
            limit: pageSize,
          },
        });
        setData(response.data.records);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  // Function to format date to DD/MM/YYYY
  const formatDate = (dateTimeString) => {
    const formattedDate = moment(dateTimeString).format("DD/MM/YYYY");
    const formattedTime = moment(dateTimeString, "HH:mm:ss").format("hh:mm A");
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
                    <th scope="col" style={{ width: "8%", color: "purple" }}>School ID</th>
                    <th scope="col" style={{ width: "8%", color: "purple" }}>Class ID</th>
                    <th scope="col" style={{ width: "10%", color: "purple" }}>User ID</th>
                    <th scope="col" style={{ width: "10%", color: "purple" }}>Name</th>
                    <th scope="col" style={{ width: "10%", color: "purple" }}>Image Filename</th>
                    <th scope="col" style={{ width: "15%", color: "purple" }}>Create Date & Time</th>
                    <th scope="col" style={{ width: "8%", color: "purple" }}>Location ID</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.School_ID}>
                        <td>{item.School_ID}</td>
                        <td>{item.Class_ID}</td>
                        <td>{item.User_ID}</td>
                        <td>{item.StudentName}</td>
                        <td>{item.Ref_Image_filename}</td>
                        <td>{formatDate(item.Ref_Image_Create_DateTime)}</td>
                        <td>{item.School_Location_ID}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        {loading ? "Loading..." : "No data available"}
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
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem active={index + 1 === currentPage} key={index}>
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
