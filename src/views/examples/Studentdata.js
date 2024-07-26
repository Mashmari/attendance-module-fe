import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";

const Studentdata = () => {
  const initialDummyData = [
    {
      id: 1,
      school: "BBPS MN",
      section: "A",
      grade: "10",
      subject: "Mathematics",
      total_registered: 30,
      present: 28,
      absent: 2,
    },
    {
      id: 2,
      school: "BBPS JH",
      section: "B",
      grade: "5",
      subject: "Science",
      total_registered: 25,
      present: 24,
      absent: 1,
    },
    {
      id: 3,
      school: "BBPS MN",
      section: "B",
      grade: "10",
      subject: "Hindi",
      total_registered: 30,
      present: 28,
      absent: 5,
    },
    // Add more dummy data as needed
  ];

  const [students] = useState(initialDummyData);

  const [schoolFilter, setSchoolFilter] = useState(null);
  const [sectionFilter, setSectionFilter] = useState(null);
  const [gradeFilter, setGradeFilter] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [dropdownOpen, setDropdownOpen] = useState({
    school: false,
    section: false,
    grade: false,
    subject: false,
  });

  const toggleDropdown = (name) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const filteredStudents = students.filter((student) => {
    return (
      (!schoolFilter || student.school === schoolFilter) &&
      (!sectionFilter || student.section === sectionFilter) &&
      (!gradeFilter || student.grade === gradeFilter) &&
      (!subjectFilter || student.subject === subjectFilter)
    );
  });

  const pageCount = Math.ceil(filteredStudents.length / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const uniqueValues = (key) => {
    return [...new Set(students.map((student) => student[key]))];
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
                  <h1>Student Data</h1>
                </div>
              </CardHeader>
              <div className="d-flex justify-content-around p-3">
                <Dropdown
                  isOpen={dropdownOpen.school}
                  toggle={() => toggleDropdown("school")}
                >
                  <DropdownToggle caret>School</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setSchoolFilter(null)}>
                      All
                    </DropdownItem>
                    {uniqueValues("school").map((school) => (
                      <DropdownItem
                        key={school}
                        onClick={() => setSchoolFilter(school)}
                      >
                        {school}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  isOpen={dropdownOpen.section}
                  toggle={() => toggleDropdown("section")}
                >
                  <DropdownToggle caret>Section</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setSectionFilter(null)}>
                      All
                    </DropdownItem>
                    {uniqueValues("section").map((section) => (
                      <DropdownItem
                        key={section}
                        onClick={() => setSectionFilter(section)}
                      >
                        {section}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  isOpen={dropdownOpen.grade}
                  toggle={() => toggleDropdown("grade")}
                >
                  <DropdownToggle caret>Grade</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setGradeFilter(null)}>
                      All
                    </DropdownItem>
                    {uniqueValues("grade").map((grade) => (
                      <DropdownItem
                        key={grade}
                        onClick={() => setGradeFilter(grade)}
                      >
                        {grade}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  isOpen={dropdownOpen.subject}
                  toggle={() => toggleDropdown("subject")}
                >
                  <DropdownToggle caret>Subject</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setSubjectFilter(null)}>
                      All
                    </DropdownItem>
                    {uniqueValues("subject").map((subject) => (
                      <DropdownItem
                        key={subject}
                        onClick={() => setSubjectFilter(subject)}
                      >
                        {subject}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Table
                className="align-items-center table-flush"
                responsive
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      School
                    </th>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      Section
                    </th>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      Grade
                    </th>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      Subject
                    </th>
                    <th
                      scope="col"
                      style={{
                        width: "15%",
                        whiteSpace: "nowrap",
                        wordBreak: "normal",
                        textAlign: "center",
                        color: "purple",
                      }}
                    >
                      Total Registered
                      <br />
                      <span style={{ display: "block" }}>Student</span>
                    </th>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      Present
                    </th>
                    <th scope="col" style={{ width: "12%", color: "purple" }}>
                      Absent
                    </th>
                    <th
                      scope="col"
                      style={{
                        width: "13%",
                        whiteSpace: "nowrap",
                        wordBreak: "normal",
                        textAlign: "center",
                        color: "purple",
                      }}
                    >
                      Resolve
                      <br />
                      <span style={{ display: "block" }}>Attendance</span>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#f9f9f9" }}>
                  {slicedStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.school}</td>
                      <td>{student.section}</td>
                      <td>{student.grade}</td>
                      <td>{student.subject}</td>
                      <td>{student.total_registered}</td>
                      <td>{student.present}</td>
                      <td>{student.absent}</td>
                      <td>
                      <Link to="/admin/resolveatt">
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() =>
                            console.log(`Resolving for ${student.id}`)
                          }
                        >
                          Resolve
                        </Button>
                        </Link>
                      </td>
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
                  <PaginationItem active={index + 1 === currentPage} key={index}>
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

// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   CardHeader,
//   Table,
//   Container,
//   Row,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
// } from "reactstrap";
// import Header from "components/Headers/Header.js";
// import { Link } from "react-router-dom";

// const Studentdata = () => {
//   const initialDummyData = [
//     {
//       id: 1,
//       school: "BBPS MN",
//       grade: "10",
//       subject: "Mathematics",
//       total_registered: 30,
//       present: 28,
//       absent: 2,
//     },
//     {
//       id: 2,
//       school: "BBPS JH",
//       grade: "5",
//       subject: "Science",
//       total_registered: 25,
//       present: 24,
//       absent: 1,
//     },
//     {
//       id: 3,
//       school: "BBPS MN",
//       grade: "10",
//       subject: "Hindi",
//       total_registered: 30,
//       present: 28,
//       absent: 5,
//     },
//     // Add more dummy data as needed
//   ];

//   const [students] = useState(initialDummyData);

//   const [schoolFilter, setSchoolFilter] = useState(null);
//   const [gradeFilter, setGradeFilter] = useState(null);
//   const [subjectFilter, setSubjectFilter] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const [dropdownOpen, setDropdownOpen] = useState({
//     school: false,
//     grade: false,
//     subject: false,
//   });

//   const toggleDropdown = (name) => {
//     setDropdownOpen((prevState) => ({
//       ...prevState,
//       [name]: !prevState[name],
//     }));
//   };

//   const filteredStudents = students.filter((student) => {
//     return (
//       (!schoolFilter || student.school === schoolFilter) &&
//       (!gradeFilter || student.grade === gradeFilter) &&
//       (!subjectFilter || student.subject === subjectFilter)
//     );
//   });

//   const pageCount = Math.ceil(filteredStudents.length / pageSize);

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const uniqueValues = (key) => {
//     return [...new Set(students.map((student) => student[key]))];
//   };

//   const slicedStudents = filteredStudents.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="bg-secondary shadow border-0">
//               <CardHeader className="bg-transparent pb-2">
//                 <div className="text-muted text-center mt-2 mb-2">
//                   <h1>Student Data</h1>
//                 </div>
//               </CardHeader>
//               <div className="d-flex justify-content-around p-3">
//                 <Dropdown
//                   isOpen={dropdownOpen.school}
//                   toggle={() => toggleDropdown("school")}
//                 >
//                   <DropdownToggle caret>School</DropdownToggle>
//                   <DropdownMenu>
//                     <DropdownItem onClick={() => setSchoolFilter(null)}>
//                       All
//                     </DropdownItem>
//                     {uniqueValues("school").map((school) => (
//                       <DropdownItem
//                         key={school}
//                         onClick={() => setSchoolFilter(school)}
//                       >
//                         {school}
//                       </DropdownItem>
//                     ))}
//                   </DropdownMenu>
//                 </Dropdown>
//                 <Dropdown
//                   isOpen={dropdownOpen.grade}
//                   toggle={() => toggleDropdown("grade")}
//                 >
//                   <DropdownToggle caret>Grade</DropdownToggle>
//                   <DropdownMenu>
//                     <DropdownItem onClick={() => setGradeFilter(null)}>
//                       All
//                     </DropdownItem>
//                     {uniqueValues("grade").map((grade) => (
//                       <DropdownItem
//                         key={grade}
//                         onClick={() => setGradeFilter(grade)}
//                       >
//                         {grade}
//                       </DropdownItem>
//                     ))}
//                   </DropdownMenu>
//                 </Dropdown>
//                 <Dropdown
//                   isOpen={dropdownOpen.subject}
//                   toggle={() => toggleDropdown("subject")}
//                 >
//                   <DropdownToggle caret>Subject</DropdownToggle>
//                   <DropdownMenu>
//                     <DropdownItem onClick={() => setSubjectFilter(null)}>
//                       All
//                     </DropdownItem>
//                     {uniqueValues("subject").map((subject) => (
//                       <DropdownItem
//                         key={subject}
//                         onClick={() => setSubjectFilter(subject)}
//                       >
//                         {subject}
//                       </DropdownItem>
//                     ))}
//                   </DropdownMenu>
//                 </Dropdown>
//               </div>
//               <Table
//                 className="align-items-center table-flush"
//                 responsive
//                 style={{ tableLayout: "fixed", width: "100%" }}
//               >
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col" style={{ width: "16%", color: "purple" }}>
//                       School
//                     </th>
//                     <th scope="col" style={{ width: "16%", color: "purple" }}>
//                       Grade
//                     </th>
//                     <th scope="col" style={{ width: "16%", color: "purple" }}>
//                       Subject
//                     </th>
//                     <th
//                       scope="col"
//                       style={{
//                         width: "20%",
//                         whiteSpace: "nowrap",
//                         wordBreak: "normal",
//                         textAlign: "center",
//                         color: "purple",
//                       }}
//                     >
//                       Total Registered
//                       <br />
//                       <span style={{ display: "block" }}>Student</span>
//                     </th>
//                     <th scope="col" style={{ width: "16%", color: "purple" }}>
//                       Present
//                     </th>
//                     <th scope="col" style={{ width: "16%", color: "purple" }}>
//                       Absent
//                     </th>
//                     <th
//                       scope="col"
//                       style={{
//                         width: "20%",
//                         whiteSpace: "nowrap",
//                         wordBreak: "normal",
//                         textAlign: "center",
//                         color: "purple",
//                       }}
//                     >
//                       Resolve
//                       <br />
//                       <span style={{ display: "block" }}>Attendance</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody style={{ backgroundColor: "#f9f9f9" }}>
//                   {slicedStudents.map((student) => (
//                     <tr key={student.id}>
//                       <td>{student.school}</td>
//                       <td>{student.grade}</td>
//                       <td>{student.subject}</td>
//                       <td>{student.total_registered}</td>
//                       <td>{student.present}</td>
//                       <td>{student.absent}</td>
//                       <td>
//                       <Link to="/admin/resolveatt">
//                         <Button
//                           color="primary"
//                           size="sm"
//                           onClick={() =>
//                             console.log(`Resolving for ${student.id}`)
//                           }
//                         >
//                           Resolve
//                         </Button>
//                         </Link>
//                       </td>
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

// export default Studentdata;
