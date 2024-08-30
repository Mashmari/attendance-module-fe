
Attendance-module-Frontend
----------------------------

#Attendance Module Frontend:

This is the frontend for the Attendance Module, a web-based application designed to manage student attendance using facial recognition and other filtering options.
---------------------
#Table of Contents:

$ Project Overview
$ Features
$ Technologies Used
$ Installation
$ Configuration
$ Running the Application
$ API Integration
$ Project Structure
$ Components Overview
$ Styling Guidelines
$ Deployment
$ Contributing
$ License
$ Contact

----------------------------- 

#Project Overview:
The Attendance Module Frontend is part of a larger system designed to track and manage student attendance in schools. It allows users to filter attendance data by school, class, section, and date, and view detailed information for individual students. 
The application also supports student enrollment with image upload and verification, daily attendance tracking.
------------------------------
#Features:

$Student Attendance Management:
 Filter and view attendance data by school, class, section, and date.
 View detailed attendance records for individual students.

$Facial Recognition Integration:
 Displays student images for attendance verification.
 Supports the enrollment of new students with image uploads.
 Ensures accurate tracking by matching student faces with existing records.

$Daily Attendance Tracking:
 Automatically updates attendance records based on facial recognition.
 Provides a visual representation of attendance status with student images.
 Generate daily attendance reports for quick review.

$Responsive Design:
 Ensures the application works seamlessly on various devices, including desktops, tablets, and mobile phones.
 Adaptive layouts that provide a consistent user experience across different screen sizes.

$Comprehensive Student Data Management:
 Maintain detailed student profiles, including enrollment status, attendance history, and associated images.
 Search and filter students by name, class, or other criteria.
 Easily update student information and re-enroll with new images if needed.

$Inline CSS for Customization:
 Quick and easy customization of the application's appearance using inline CSS.
 Personalized styling for dropdowns, buttons, and other UI elements.

$API Integration:
 Seamless integration with backend APIs for fetching, updating, and submitting data.
 Real-time updates and data synchronization with the server.
--------------------------------
#Technologies Used:
React: A JavaScript library for building user interfaces.
React Router: For handling routing in the application.
Axios: For making HTTP requests to the backend API.
Inline CSS: Used for styling components.
---------------------------------

Installation...

Prerequisites....

Node.js and npm should be installed on your machine.


cd attendance-module-frontend..

Install Dependencies..

npm install --force
---------------------------


#API Endpoints:
Ensure that the API endpoints in your components are correctly configured to match your backend setup. 
Update the following endpoints in the respective components:
------------------------------

#Running the Application:
To start the development server, run:

npm start --force

The application will be available at http://localhost:3000/am     and   http://192.168.18.10:3000/am
-------------------------
#API Integration:

The application relies on a backend API for fetching and submitting data. Ensure your backend is running and properly configured before using the frontend.
----------------------------
#Project Structure:

src/
│
├── components/        # React components
│   ├── Footers/ 
│   ├── Headers/ 
│   ├── Navbars/ 
│   └── Sidebar/
│   
├──  Layouts
├──  variables
├──  views/
│     └──  examples/
│             ├──Addstudent.js/    #Add Student components
│             ├──resolveatt.js/    # Attendance details components
│             ├──resolveimg.js/    # Image Resolve for enrollment of the student components
│             ├──Studentdata.js/   # Student Details components
│             └──Table.js/         # Daily Attendence of student with image data components 
│             
│             
├── index.js/                      
└── routes.js             # Main application file
---------------------------------

#Components Overview:

$School Data:
 Displays student attendance data filtered by school, class, section, and date.
 Provides a summary of attendance with a clear visual representation of present and absent students.

$Attendancedetail:
 Shows detailed attendance data when navigating from the Testattendance component.
 Includes individual student attendance records, allowing for in-depth review of each student's presence on a specific date.

$SchoolImageData:
 Displays student image data with dropdowns for filtering by school and class.
 Allows users to search for and view student images based on the selected filters, aiding in student identification and verification.

$Addstudent:
 Manages the addition of new students, including the upload of reference images for facial recognition.
 Provides input fields for school name, class name, and student name, and submits this data to the backend API.
 Ensures that new student records are created with accurate information and associated images.

$Resolveimg:
 Handles the image resolution process for the enrollment of students.
 Ensures that student images are correctly uploaded, processed, and stored in the system for future recognition.
 Facilitates the linking of uploaded images to the corresponding student profiles, maintaining data integrity.

$Resolveatt:
 Manages the detailed display and resolution of attendance data.
 Provides in-depth information on student attendance, especially when discrepancies arise, ensuring accurate records.
 Supports the verification process by cross-referencing attendance records with student images for validation.
------------------------------------
#Styling Guidelines:

Primary Color: #50085e is used for headings and icon colors.
Inline CSS: Preferred for quick styling changes, especially for dropdowns and status colors.
Responsive Design: Ensure that components adjust properly on different screen sizes.
-----------------------------------------
#Deployment:

To deploy the application, build it using:

npm run build..

The build files will be generated in the build/ directory, which can be deployed to any static hosting service.



--------/----------------/--------------------







