const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const teamMemberAttendanceRoutes = require("./routes/team-member-attendance");
const caresRoutes = require("./routes/cares");

const app = express();

mongoose.connect("mongodb+srv://cfaDashAdmin:wQap0uddC5qWWMxk@dashcluster0.zftsx.mongodb.net/CFA-Dashboard?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                  console.log('Connected to database!')
                })
                .catch(() => {
                  console.log('Connection failed')
                });

app.use(cors());
app.use(express.json());

app.use("/api/team-attendance", teamMemberAttendanceRoutes);
app.use("/api/cares", caresRoutes);

module.exports = app;
