const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(express.static(__dirname));


// ==========================================
// TEMPORARY DATABASE
// ==========================================

const employers = [];
const employees = [];


// ==========================================
// HOME PAGE
// ==========================================

app.get("/", function (req, res) {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ==========================================
// EMPLOYER REGISTRATION
// ==========================================

app.post("/api/employers", function (req, res) {

    const {
        companyName,
        ownerName,
        email,
        phone
    } = req.body;

    if (
        !companyName ||
        !ownerName ||
        !email ||
        !phone
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    }

    const employerID = generateEmployerID();

    const employer = {

        employerID: employerID,

        companyName: companyName,

        ownerName: ownerName,

        email: email,

        phone: phone,

        createdAt: new Date()

    };

    employers.push(employer);

    console.log("New Employer:", employer);

    res.json({

        success: true,

        message: "Employer created successfully.",

        employerID: employerID

    });

});


// ==========================================
// GENERATE EMPLOYER ID
// ==========================================

function generateEmployerID() {

    const random = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return "ORG-" + random;

}


// ==========================================
// ADD EMPLOYEE
// ==========================================

app.post("/api/employees", function (req, res) {

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

            message: "Required fields are missing."

        });

    }

    const employeeID = generateEmployeeID();

    const employee = {

        employeeID: employeeID,

        name: name,

        designation: designation,

        company: company,

        joiningDate: joiningDate,

        salary: salary || null,

        verified: false,

        createdAt: new Date()

    };

    employees.push(employee);

    console.log("New Employee:", employee);

    res.json({

        success: true,

        message: "Employee added successfully.",

        employeeID: employeeID

    });

});


// ==========================================
// GENERATE EMPLOYEE ID
// ==========================================

function generateEmployeeID() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let id = "EMP-";

    for (let i = 0; i < 6; i++) {

        id += characters[
            Math.floor(
                Math.random() * characters.length
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
    function (req, res) {

        const employeeID =
            req.params.employeeID.toUpperCase();

        const employee = employees.find(
            function (item) {

                return item.employeeID === employeeID;

            }
        );

        if (!employee) {

            return res.status(404).json({

                success: false,

                message: "Employee not found."

            });

        }

        res.json({

            success: true,

            employee: employee

        });

    }
);


// ==========================================
// EMPLOYER LIST
// ==========================================

app.get("/api/employers", function (req, res) {

    res.json({

        success: true,

        total: employers.length,

        employers: employers

    });

});


// ==========================================
// EMPLOYEE LIST
// ==========================================

app.get("/api/employees", function (req, res) {

    res.json({

        success: true,

        total: employees.length,

        employees: employees

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, function () {

    console.log("================================");
    console.log("Employment Trust Server Started");
    console.log("================================");
    console.log("Server running on port " + PORT);

});
