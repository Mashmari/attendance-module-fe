
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa"; // Import the download icon from react-icons
import { startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from 'date-fns'; // Import date-fns functions for date calculations

const Testattendance = () => {
    const [dropdownOpen, setDropdownOpen] = useState({
        school: false,
        grade: false,
        section: false,
        dateRange: false,
    });

    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); // For exact date selection
    const [dateRange, setDateRange] = useState("all"); // For date range selection
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Set selectedDate to current date when component mounts
        setSelectedDate(new Date());
    }, []);

    const toggleDropdown = (type) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    // Mock data for dropdown items (replace with real data)
    const uniqueValues = (type) => {
        switch (type) {
            case "school":
                return ["BBPS MNS", "BBPS JHL", "BBPS LJP N"];
            case "grade":
                return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            case "section":
                return ["Section A", "Section B", "Section C", "Section D"];
            default:
                return [];
        }
    };

    // Mock student data
    const studentsData = [
        { name: "John Doe", school: "BBPS MNS", grade: "1", section: "Section A", date: "01/01/2024", status: "present" },
        { name: "Jane Smith", school: "BBPS JHL", grade: "2", section: "Section B", date: "02/01/2024", status: "absent" },
        { name: "Pamela Jefferson", school: "BBPS JHL", grade: "10", section: "Section D", date: "01/04/2024", status: "absent" },
        { name: "Sarah Roman", school: "BBPS MNS", grade: "3", section: "Section D", date: "20/12/2024", status: "present" },
        { name: "Misty Johnson", school: "BBPS JHL", grade: "4", section: "Section C", date: "04/12/2024", status: "present" },
        // ... (more student data)
    ];

    const filterStudents = () => {
        const startDate = dateRange === "This Week" ? startOfWeek(new Date()) :
                          dateRange === "This Month" ? startOfMonth(new Date()) :
                          dateRange === "This Year" ? startOfYear(new Date()) :
                          null;
                          
        const endDate = dateRange === "This Week" ? endOfWeek(new Date()) :
                        dateRange === "This Month" ? endOfMonth(new Date()) :
                        dateRange === "This Year" ? endOfYear(new Date()) :
                        null;

        return studentsData.filter(student => {
            const studentDate = new Date(student.date.split('/').reverse().join('/')); // Convert 'dd/MM/yyyy' to 'MM/dd/yyyy'
            return (
                (!selectedSchool || student.school === selectedSchool) &&
                (!selectedGrade || student.grade === selectedGrade) &&
                (!selectedSection || student.section === selectedSection) &&
                (dateRange === "all" || (studentDate >= startDate && studentDate <= endDate) || student.date === selectedDate.toLocaleDateString('en-GB'))
            );
        });
    };

    const filteredStudents = filterStudents();
    const totalStudents = filteredStudents.length;
    const presentStudents = filteredStudents.filter(student => student.status === "present").length;
    const absentStudents = filteredStudents.filter(student => student.status === "absent").length;

    // Function to generate CSV data
    const csvData = filteredStudents.map(student => ({
        Name: student.name,
        School: student.school,
        Grade: student.grade,
        Section: student.section,
        Date: student.date,
        Status: student.status,
    }));

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-muted text-center mt-2 mb-2">
                                        <h1 style={{ color: '#50085e' }}> Attendance </h1>
                                    </div>
                                </div>
                            </CardHeader>
                            <div className="p-3">
                                <Row className="justify-content-center">
                                    <Col md="auto" className="d-flex align-items-center">
                                        <Dropdown
                                            isOpen={dropdownOpen.school}
                                            toggle={() => toggleDropdown("school")}
                                        >
                                            <DropdownToggle caret>
                                                {selectedSchool || "School"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setSelectedSchool(null)}>
                                                    All
                                                </DropdownItem>
                                                {uniqueValues("school").map((school) => (
                                                    <DropdownItem
                                                        key={school}
                                                        onClick={() => setSelectedSchool(school)}
                                                    >
                                                        {school}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                    <Col md="auto" className="d-flex align-items-center">
                                        <Dropdown
                                            isOpen={dropdownOpen.grade}
                                            toggle={() => toggleDropdown("grade")}
                                        >
                                            <DropdownToggle caret>
                                                {selectedGrade || "Grade"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setSelectedGrade(null)}>
                                                    All
                                                </DropdownItem>
                                                {uniqueValues("grade").map((grade) => (
                                                    <DropdownItem
                                                        key={grade}
                                                        onClick={() => setSelectedGrade(grade)}
                                                    >
                                                        {grade}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                    <Col md="auto" className="d-flex align-items-center">
                                        <Dropdown
                                            isOpen={dropdownOpen.section}
                                            toggle={() => toggleDropdown("section")}
                                        >
                                            <DropdownToggle caret>
                                                {selectedSection || "Section"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setSelectedSection(null)}>
                                                    All
                                                </DropdownItem>
                                                {uniqueValues("section").map((section) => (
                                                    <DropdownItem
                                                        key={section}
                                                        onClick={() => setSelectedSection(section)}
                                                    >
                                                        {section}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                    <Col md="auto" className="d-flex align-items-center">
                                        <Dropdown
                                            isOpen={dropdownOpen.dateRange}
                                            toggle={() => toggleDropdown("dateRange")}
                                        >
                                            <DropdownToggle caret>
                                                {dateRange || "Date Range"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setDateRange("all")}>
                                                    All Time
                                                </DropdownItem>
                                                <DropdownItem onClick={() => setDateRange("This Week")}>
                                                    This Week
                                                </DropdownItem>
                                                <DropdownItem onClick={() => setDateRange("This Month")}>
                                                    This Month
                                                </DropdownItem>
                                                <DropdownItem onClick={() => setDateRange("This Year")}>
                                                    This Year
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                    {dateRange === "all" && (
                                        <Col md="auto" className="d-flex align-items-center">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                dateFormat="dd/MM/yy"
                                                className="form-control"
                                                placeholderText="Select Date"
                                            />
                                        </Col>
                                    )}
                                </Row>
                                <div className="d-flex justify-content-center mt-3">
                                    <Button color="primary" onClick={() => setShowDetails(!showDetails)}>
                                        Show Details
                                    </Button>
                                </div>
                            </div>
                            <Row className="p-3">
                                <Col md="4">
                                    <Card style={{ backgroundColor: '#50085e', color: 'white' }} className="shadow border-0">
                                        <CardBody className="text-center">
                                            <h2>Total Students</h2>
                                            <h3>{totalStudents}</h3>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card style={{ backgroundColor: '#50085e', color: 'white' }} className="shadow border-0">
                                        <CardBody className="text-center">
                                            <h2>Present Students</h2>
                                            <h3>{presentStudents}</h3>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card style={{ backgroundColor: '#50085e', color: 'white' }} className="shadow border-0">
                                        <CardBody className="text-center">
                                            <h2>Absent Students</h2>
                                            <h3>{absentStudents}</h3>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            {showDetails && (
                                <Row className="p-3">
                                    <Col>
                                        <Card className="shadow border-0">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h3>Student Details</h3>
                                                    <CSVLink
                                                        data={csvData}
                                                        filename={"student_details.csv"}
                                                        className="btn btn-success"
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <FaDownload style={{ marginRight: '8px' }} />
                                                        Download CSV
                                                    </CSVLink>
                                                </div>
                                                <br />
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>School</th>
                                                            <th>Grade</th>
                                                            <th>Section</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredStudents.map((student, index) => (
                                                            <tr key={index}>
                                                                <td>{student.name}</td>
                                                                <td>{student.school}</td>
                                                                <td>{student.grade}</td>
                                                                <td>{student.section}</td>
                                                                <td>{student.date}</td>
                                                                <td>{student.status}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Testattendance;
