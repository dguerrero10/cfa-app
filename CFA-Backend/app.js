const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const teamMemberAttendanceRoutes = require("./routes/team-members-attendance");
const caresRoutes = require("./routes/cares");
const itemOrderRoutes = require('./routes/item-orders');
const financialServicesRoutes = require('./routes/financial-services');
const borrowingTrackerRoutes = require('./routes/borrowing-tracker');
const cashAccountabilityRoutes = require('./routes/cash-accountability');

const app = express();

mongoose.connect("mongodb+srv://cfaDashAdmin:wQap0uddC5qWWMxk@dashcluster0.zftsx.mongodb.net/CFA-Dashboard?retryWrites=true&w=majority",
                { useNewUrlParser: true, 
                  useUnifiedTopology: true,
                  useCreateIndex: true})
                .then(() => {
                  console.log('Connected to database!')
                })
                .catch(() => {
                  console.log('Connection failed')
                });

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join("CFA-Backend/images")));

app.use("/api/users", userRoutes);
app.use("/api/team-members-attendance", teamMemberAttendanceRoutes);
app.use("/api/cares", caresRoutes);
app.use("/api/item-orders", itemOrderRoutes);
app.use("/api/financial-services", financialServicesRoutes);
app.use("/api/borrowing-tracker", borrowingTrackerRoutes);
app.use("/api/cash-accountability", cashAccountabilityRoutes);

module.exports = app;
