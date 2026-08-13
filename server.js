// ==========================================
// EMPLOYMENT TRUST
// Backend Server - Version 1
// ==========================================


const express = require("express");

const path = require("path");


// Create Express application

const app = express();


// Server Port

const PORT = 3000;


// ==========================================
// MIDDLEWARE
// ==========================================


// Allow JSON data

app.use(
    express.json()
);


// Serve files from public folder

app.use(express.static(__dirname));


// ==========================================
// TEMPORARY DATABASE
// ==========================================


// IMPORTANT:
// This is only for our first prototype.
// Later we will replace this with
// a real database.

const employers = [];

const employees = [];


// ==========================================
// HOME PAGE
// ==========================================


app.get(
    "/",
    function(req, res) {

        res.sendFile(
            path.join(
                __dirname,
                "public",
                "index.html"
            )
        );

    }
);


// ==========================================
// EMPLOYER REGISTRATION
// ==========================================


app.post(
    "/api/employers",
    function(req, res) {


        const {
            companyName,
            ownerName,
            email,
            phone
        } = req.body;


        // Basic validation

        if (
            !companyName ||
            !ownerName ||
            !email ||
            !phone
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required."

            });

        }


        // Generate Employer ID

        const employerID =
            generateEmployerID();


        // Create employer

        const employer = {

            employerID:

                employerID,

            companyName:

                companyName,

            ownerName:

                ownerName,

            email:

                email,

            phone:

                phone,

            createdAt:

                new Date()

        };


        // Save employer

        employers.push(
            employer
        );


        console.log(
            "New Employer:",
            employer
        );


        // Send response

        res.json({

            success: true,

            message:
                "Employer created successfully.",

            employerID:
                employerID

        });

    }
);


// ==========================================
// GENERATE EMPLOYER ID
// ==========================================


function generateEmployerID() {


    const random =
        Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    return "ORG-" + random;

}


// ==========================================
// ADD EMPLOYEE
// ==========================================


app.post(
    "/api/employees",
    function(req, res) {


        const {

            name,

            designation,

            company,

            joiningDate,

            salary

        } = req.body;


        if (

            !name ||

            !designation ||

            !company ||

            !joiningDate

        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Required fields are missing."

            });

        }


        // Generate Employee ID

        const employeeID =
            generateEmployeeID();


        const employee = {

            employeeID:

                employeeID,

            name:

                name,

            designation:

                designation,

            company:

                company,

            joiningDate:

                joiningDate,

            salary:

                salary || null,

            verified:

                false,

            createdAt:

                new Date()

        };


        employees.push(
            employee
        );


        console.log(
            "New Employee:",
            employee
        );


        res.json({

            success: true,

            message:
                "Employee added successfully.",

            employeeID:
                employeeID

        });

    }
);


// ==========================================
// GENERATE EMPLOYEE ID
// ==========================================


function generateEmployeeID() {


    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let id = "EMP-";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        id +=
            characters[
                Math.floor(
                    Math.random()
                    *
                    characters.length
                )
            ];

    }


    return id;

}


// ==========================================
// SEARCH EMPLOYEE
// ==========================================


app.get(
    "/api/employees/:employeeID",
    function(req, res) {


        const employeeID =
            req.params.employeeID
            .toUpperCase();


        const employee =
            employees.find(

                function(item) {

                    return (
                        item.employeeID
                        ===
                        employeeID
                    );

                }

            );


        if (!employee) {

            return res.status(404).json({

                success: false,

                message:
                    "Employee not found."

            });

        }


        res.json({

            success: true,

            employee:

                employee

        });

    }
);


// ==========================================
// EMPLOYER LIST
// ==========================================


// Temporary admin/testing route

app.get(
    "/api/employers",
    function(req, res) {

        res.json({

            success: true,

            total:
                employers.length,

            employers:
                employers

        });

    }
);


// ==========================================
// EMPLOYEE LIST
// ==========================================


// Temporary admin/testing route

app.get(
    "/api/employees",
    function(req, res) {

        res.json({

            success: true,

            total:
                employees.length,

            employees:
                employees

        });

    }
);


// ==========================================
// START SERVER
// ==========================================


app.listen(
    PORT,
    function() {

        console.log(
            "================================"
        );

        console.log(
            "Employment Trust Server Started"
        );

        console.log(
            "================================"
        );

        console.log(
            Open: http://localhost:${PORT}
        );

    }
);
