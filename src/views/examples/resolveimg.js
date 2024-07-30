// import React, { useEffect, useState } from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   CardHeader,
//   CardFooter,
//   Media,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Table,
//   Container,
//   Row,
//   Col,
//   CardBody,
//   Form,
//   FormGroup,
// } from "reactstrap";
// import image from "../../assets/img/brand/WIN_20240713_11_29_25_Pro.jpg";
// import Header from "components/Headers/Header.js";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Resolveimg = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     id:"",
//     School_ID: "",
//     Class_ID: "",
//     Student_ID: "",
//     Ref_Image_filename: "",
//     Ref_Image_filepath: "",
//     Ref_Image_Create_DateTime:"",
//     Ref_Image_Update_DateTime:"",
//     Ref_Image_Update_Count:"",
//     Location_ID: "",
//     StudentName: "",
//     Param1: "",
//     Param2: "",
//     imageClickedOn: "",
//     location: "",
//     timestamp: "",
//   });

//   const [imagePath, setImagePath] = useState(""); // State to store image path
 
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const userID = params.get("userID");
//     const timestamp = params.get("timestamp");
//     const imagePathFromURL = params.get("imagePath"); // Get the image path from the URL
 
//     if (userID) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         User_ID: userID,
//         timestamp: timestamp || "",
//       }));
//     }
//     if (imagePathFromURL) {
//       setImagePath(decodeURIComponent(imagePathFromURL)); // Decode and set the image path
//     }
//   }, [location]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/mamSchoolStudent/create", formData);
//       console.log("Data sent successfully:", response.data);
//       toast.success("Attendance resolved!", {
//         icon: "✅",
//         onClose: () => navigate("/admin/tables"),
//       });
//       setFormData({
//         id:"",
//         School_ID: "",
//         Class_ID: "",
//         User_ID: "",
//         Ref_Image_filename: "",
//         Ref_Image_filepath: "",
//         Ref_Image_Create_DateTime: "",
//         Ref_Image_Update_DateTime: "",
//         Ref_Image_Update_Count: "",
//         Location_ID: "",
//         StudentName: "",
//         Param1: "",
//         Param2: "",
//         imageClickedOn: "",
//         location: "",
//         // timestamp: "", 
//       });
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       toast.error("Attendance not resolved!", {
//         icon: "❌",
//         onClose: () => navigate("/admin/tables"),
//       });
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row className="justify-content-center">
//           <Col lg="12" md="12">
//             <Card className="bg-secondary shadow border-0">
//               <CardHeader className="bg-transparent pb-2">
//                 <div className="text-muted text-center mt-2 mb-2">
//                   <h1>Enter Student Details</h1>
//                 </div>
//               </CardHeader>
//               <CardBody className="px-lg-2 py-lg-2">
//                 <Form role="form" onSubmit={handleSubmit}>
//                   <FormGroup>
//                     <div
//                       style={{
//                         marginBottom: 8,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <label
//                         htmlFor="imageField"
//                         style={{
//                           flex: 1,
//                           marginRight: 8,
//                           color: "purple",
//                           fontWeight: "bold",
//                           textAlign: "center",
//                         }}
//                       ></label>
//                       <img
//                         src={image}
//                         alt="Student Image"
//                         id="imageField"
//                         style={{
//                           flex: 2,
//                           maxWidth: 150,
//                           height: "auto",
//                           border: "1px solid #ccc",
//                           borderRadius: 5,
//                           marginBottom: 8,
//                         }}
//                       />
//                     </div>
//                     <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
//                       <div style={{ flex: 1, marginRight: 8 }}>
//                         <label htmlFor="User_ID" style={{ color: "purple", fontWeight: "bold" }}>Student ID:</label>
//                         <input
//                           type="text"
//                           id="User_ID"
//                           name="User_ID"
//                           value={formData.User_ID}
//                           onChange={handleChange}
//                           className="form-control"
//                           readOnly
//                           required
//                         />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <label htmlFor="timestamp" style={{ color: "purple", fontWeight: "bold" }}>Image Clicked On:</label>
//                         <input
//                           type="text"
//                           id="imageClickedOn"
//                           name="imageClickedOn"
//                           value={formData.timestamp}
//                           onChange={handleChange}
//                           className="form-control"
//                           required
//                           readOnly
//                         />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <label htmlFor="StudentName" style={{ color: "purple", fontWeight: "bold" }}>Student Name:</label>
//                         <input
//                           type="text"
//                           id="StudentName"
//                           name="StudentName"
//                           value={formData.StudentName}
//                           onChange={handleChange}
//                           className="form-control"
//                         />
//                       </div>
//                     </div>
//                   </FormGroup>
//                   <div className="text-center">
//                     <Button className="mt-4" color="primary" type="submit">
//                       Submit
//                     </Button>
//                   </div>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//       <ToastContainer />
//     </>
//   );
// };

// export default Resolveimg;


import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
} from "reactstrap";
// import image from "../../assets/img/brand/WIN_20240713_11_29_25_Pro.jpg";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resolveimg = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    School_ID: "",
    Class_ID: "",
    Student_ID: "",
    Ref_Image_filename: "",
    Ref_Image_filepath: "",
    Ref_Image_Create_DateTime: "",
    Ref_Image_Update_DateTime: "",
    Ref_Image_Update_Count: "",
    Location_ID: "",
    StudentName: "",
    Param1: "",
    Param2: "",
    imageClickedOn: "",
    location: "",
    timestamp: "",
  });

  const [imagePath, setImagePath] = useState(""); // State to store image path

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const Id = params.get("id");
    const timestamp = params.get("timestamp");
    const imagePathFromURL = params.get("imagePath"); // Get the image path from the URL

    if (Id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: Id,
        timestamp: timestamp || "",
      }));
    }
    if (imagePathFromURL) {
     setImagePath(decodeURIComponent(imagePathFromURL)); // Decode and set the image path
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/mamSchoolStudent/create", formData);
      console.log("Data sent successfully:", response.data);
      toast.success("Attendance resolved!", {
        icon: "✅",
        onClose: () => navigate("/admin/tables"),
      });
      setFormData({
        id: "",
        School_ID: "",
        Class_ID: "",
        Student_ID: "",
        Ref_Image_filename: "",
        Ref_Image_filepath: "",
        Ref_Image_Create_DateTime: "",
        Ref_Image_Update_DateTime: "",
        Ref_Image_Update_Count: "",
        Location_ID: "",
        StudentName: "",
        Param1: "",
        Param2: "",
        imageClickedOn: "",
        location: "",
        // timestamp: "", 
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Attendance not resolved!", {
        icon: "❌",
        onClose: () => navigate("/admin/tables"),
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="12" md="12">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-2">
                <div className="text-muted text-center mt-2 mb-2">
                  <h1>Enter Student Details</h1>
                </div>
              </CardHeader>
              <CardBody className="px-lg-2 py-lg-2">
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <div
                      style={{
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <label
                        htmlFor="imageField"
                        style={{
                          flex: 1,
                          marginRight: 8,
                          color: "purple",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                      </label>
                      {imagePath && ( 
                      <img
                        src={imagePath}
                        alt="Student Image"
                        id="imageField"
                        style={{
                          flex: 2,
                          maxWidth: 150,
                          height: "auto",
                          border: "1px solid #ccc",
                          borderRadius: 5,
                          marginBottom: 8,
                        }}
                      />
                    )}
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <label htmlFor="id" style={{ color: "purple", fontWeight: "bold" }}>Student ID:</label>
                      <input
                        type="text"
                        id="Id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className="form-control"
                        readOnly
                        required
                      />
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label htmlFor="imageClickedOn" style={{ color: "purple", fontWeight: "bold" }}>Image Clicked On:</label>
                      <input
                        type="text"
                        id="imageClickedOn"
                        name="imageClickedOn"
                        value={formData.timestamp}
                        onChange={handleChange}
                        className="form-control"
                        required
                        readOnly
                      />
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <label htmlFor="StudentName" style={{ color: "purple", fontWeight: "bold" }}>Student Name:</label>
                      <input
                        type="text"
                        id="StudentName"
                        name="StudentName"
                        value={formData.StudentName}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Resolveimg;
