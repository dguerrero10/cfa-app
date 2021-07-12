const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransporter({
    auth: {
        api_key: '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'
    }
}));

const TeamMemberAttendance = require('../../models/team-member-attendance');

module.exports = {
    queryNoAttendance: (req) => {
        let query = TeamMemberAttendance.find({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            issue: { "$in": ['No call no show', 'Call in personal', 'Call in sick', 'Did not call in'] }
        });
        query.countDocuments((error, count) => {
            if (error) {
                console.log(error);
            }
            if (count >= 2) {
                transporter.sendMail({
                    to: 'daveabdouguerrero@gmail.com',
                    from: 'cfadash7809@gmail.com',
                    subject: 'Employee Call In Limit Reached',
                    html:
                    `<h4>Attendance Issues</h4>
                    <p>
                        This email is to inform you that the employee 
                        <strong>${req.body.firstName} ${req.body.lastName}</strong>
                        has been absent from work <strong>${count}</strong> times in the past two months due to Call Ins.
                    </p>
                    <p>Visit the CFA-Dashboard for more information.</p>
                    <p>This is an automated email, do not respond.</p>
                    `
                });
            }
        });
    },
    queryUniformIssues: (req) => {
        let query = TeamMemberAttendance.find({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            issue: { "$in": ['Uniform'] }
        });
        query.countDocuments((error, count) => {
            if (error) {
                console.log(error);
            }
            if (count >= 2) {
                console.log(count)
                transporter.sendMail({
                    to: 'daveabdouguerrero@gmail.com',
                    from: 'cfadash7809@gmail.com',
                    subject: 'Employee Uniform Issue',
                    html: 
                    `<h4>Attendance Issues</h4>
                    <p>
                        This email is to inform you that the employee 
                        <strong>${req.body.firstName} ${req.body.lastName}</strong>
                        has had <strong>${count}</strong> uniform violations in the past two months.
                    </p>
                    <p>Visit the CFA-Dashboard for more information.</p>
                    <p>This is an automated email, do not respond.</p>
                    `
                });
            }
        });
    },
    queryLateToWork: (req) => {
        let query = TeamMemberAttendance.find({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            issue: { "$in": ['Late to work'] }
        });
        query.countDocuments((error, count) => {
            if (error) {
                console.log(error);
            }
            if (count >= 2) {
                console.log(count)
                transporter.sendMail({
                    to: 'daveabdouguerrero@gmail.com',
                    from: 'cfadash7809@gmail.com',
                    subject: 'Employee Late to Work Issue',
                    html: 
                    `<h4>Attendance Issues</h4>
                    <p>
                        This email is to inform you that the employee 
                        <strong>${req.body.firstName} ${req.body.lastName}</strong>
                        has been late to work <strong>${count}</strong> times in the past two months.
                    </p>
                    <p>Visit the CFA-Dashboard for more information.</p>
                    <p>This is an automated email, do not respond.</p>
                    `
                });
            }
        });
    }
}