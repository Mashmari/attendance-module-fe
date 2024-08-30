import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Resolveimg from "views/examples/resolveimg.js";
import Studentdata from "views/examples/Studentdata";
import Resolveatt from "views/examples/resolveatt.js";
import Sidebar from "components/Sidebar/Sidebar";
import Testattendance from "views/examples/testattendance";
import AddStudent from "views/examples/Addstudent";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/studentdata",
    name: "School Data ",
    icon: "ni ni-single-02 text-red",
    component: <Studentdata />,
    layout: "/admin",
    
  },
  {
    path: "/resolveatt",
    name: "Student Roster",
    icon: "ni ni-settings text-red",
    component: <Resolveatt />,
    layout: "/admin",
  },
  {
    path: "/addstudent",
    name: "Add Student",
    icon: "ni ni-settings ",
    component: <AddStudent />,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/tables",
    name: "Daily Attendance",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
 

  {
    path: "/resolveimg",
    name: "Resolve Image Store",
    icon: "ni ni-image",
    component: <Resolveimg />,
    layout: "/admin",
    hidden: true, // Add this line
  },
  {
    path: "/testattendance",
    name: "Test Attendance",
    icon: "ni ni-single-02",
    component: <Testattendance />,
    layout: "/admin",
    hidden: true,
  },
  // {
  //   path: "/register",
  //   name: "Login User",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
// var routes = [
//   {
//     path: "/index",
//     name: "Dashboard",
//     icon: <i className="ni ni-tv-2" style={{ color: '#50085e' }}></i>,
//     component: <Index />,
//     layout: "/admin",
//     hidden: true,
//   },
//   {
//     path: "/studentdata",
//     name: "School Data",
//     icon: <i className="ni ni-single-02" style={{ color: '#50085e' }}></i>,
//     component: <Studentdata />,
//     layout: "/admin",
//   },
//   {
//     path: "/resolveatt",
//     name: "Student Roster",
//     icon: <i className="ni ni-settings" style={{ color: '#50085e' }}></i>,
//     component: <Resolveatt />,
//     layout: "/admin",
//   },
//   {
//     path: "/addstudent",
//     name: "Add Student",
//     icon: <i className="ni ni-settings" style={{ color: '#50085e' }}></i>,
//     component: <AddStudent />,
//     layout: "/admin",
//     hidden: true,
//   },
//   {
//     path: "/tables",
//     name: "Daily Attendance",
//     icon: <i className="ni ni-bullet-list-67" style={{ color: '#50085e' }}></i>,
//     component: <Tables />,
//     layout: "/admin",
//   },
//   {
//     path: "/resolveimg",
//     name: "Resolve Image Store",
//     icon: <i className="ni ni-image" style={{ color: '#50085e' }}></i>,
//     component: <Resolveimg />,
//     layout: "/admin",
//     hidden: true,
//   },
//   {
//     path: "/testattendance",
//     name: "Test Attendance",
//     icon: <i className="ni ni-single-02" style={{ color: '#50085e' }}></i>,
//     component: <Testattendance />,
//     layout: "/admin",
//     hidden: true,
//   },
// ];
// export default routes;
