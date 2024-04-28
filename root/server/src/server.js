const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;

 // Set a higher limit, e.g., 10MB

app.use(bodyParser.json({ limit: "100MB" }));
app.use(express.json());
app.use(cors());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully!");
});

//routes

const sessionRouter = require("./routs/SessionRoutes.js");
const reservationRouter = require("./routs/ReservationRoutes.js");

app.use("/sessions", sessionRouter);
app.use("/reservations", reservationRouter);

const eventRouter = require("./routs/EventManagement_events.js");
app.use("/event", eventRouter);

const postPayments = require("./routs/FinancialManagement_payment");
app.use(postPayments);

const postOutgoing = require("./routs/FinancialManagement_outgoing.js");
app.use(postOutgoing);

const postTransaction = require("./routs/FinancialManagement_Transaction");
app.use(postTransaction);

const postMonthlyTarget = require("./routs/FinancialManagement_MonthlyTargets.js");
app.use(postMonthlyTarget);

//staff management
const employeeRouter = require("./routs/StaffManagement_employees.js");
app.use("/employee",employeeRouter);

const worksheetRouter=require("./routs/StaffManagement_worksheets.js");
app.use("/worksheet",worksheetRouter);

const leaveRouter =  require("./routs/StaffManagement_leaveRoutes.js");
app.use("/LeaveRequest",leaveRouter);

const noticeRouter =  require("./routs/StaffManagement_notices.js");
app.use("/Notice",noticeRouter);


const qrCodeRouter = require('./routs/StaffManagement_qrCodeRouter.js');
app.use('/Qr', qrCodeRouter);

const attendanceRouter =  require("./routs/StaffManagement_attendance.js");
app.use("/Attendance",attendanceRouter);

const customerRouter = require("./routs/CustomerManagement_customer.js");
app.use("/Customer",customerRouter);
//end
 saleRouter = require("./routs/SalesManagement_sales.js");
http://localhost:4000/sale
app.use("/sale",saleRouter);


http://localhost:4000/Rental
 rentalRouter = require("./routs/SalesManagement_rental.js");
app.use("/Rental", rentalRouter);


http://localhost:4000/Receipt
 receiptRouter = require("./routs/SalesManagement_receipt.js");
app.use('/Receipt', receiptRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
