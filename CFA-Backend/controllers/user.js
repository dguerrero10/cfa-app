const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransporter({
    auth: {
        api_key: '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'
    }
}));

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const EmployeeId = require('../models/employee-id');

exports.registerUser = (req, res, next) => {
    EmployeeId.findOne({ employeeId: req.body.employeeId })
        .then(employeeId => {
            if (!employeeId) {
                return res.status(401).json({
                    message: "No employee ID found."
                })
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        employeeId: req.body.employeeId,
                        email: req.body.email,
                        password: hash
                    });
                    user.save() 
                        .then(() => {
                            transporter.sendMail({
                            to: req.body.email,
                            from: 'cfadash7809@gmail.com',
                            subject: 'CFA-Dashboard Sign Up Successful!',
                            html: 
                            `<h3>Sign Up Successful!</h3>
                            <p>
                                Hi, <strong>${req.body.firstName} ${req.body.lastName}</strong>.
                            </p>
                            <p>
                                Welcome to the CFA-Dashboard. If you have any questions on how to operate
                                the Dashboard, talk to <strong>Tim Padgett</strong>.
                            </p>
                            <p>
                                Furthermore, if you experience any issues with the application,
                                please email:
                            </p>
                            <p><strong>daveabdouguerrero@gmail.com</strong></p>
                            <p>with an explanation of the issue you're experiencing.</p>
                            <p>This is an automated email, do not respond.</p>
                            `
                     });
                    });
                    res.status(201).json({
                        success: true
                    });
                   
                })
                .catch(error => {
                    res.status(401).json({
                        error: error
                    })
                });
        });
}

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Could not find user with this email.'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Authentication failed.'
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, _id: fetchedUser._id },
                '87CE40D3FFDB218326DBDA1E3602214F1E40EB73A1CD73A08011DEA986881A6B',
                { expiresIn: '24hr' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 86400,
                user: {
                    _id: fetchedUser._id,
                    firstName: fetchedUser.firstName,
                    lastName: fetchedUser.lastName,
                    employeeId: fetchedUser.employeeId,
                    email: fetchedUser.email
                }
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication failed.'
            });
        });
};

exports.currentUser = (req, res, next) => {
    User.findById(req.params.id)
        .select('-password')
        .then(userData => {
            res.status(201).json({
                userData: userData
            });
        });
}

exports.getAllUsers = (req, res, next) => {
    User.find()
        .select('-password')
        .then(users => {
            res.status(201).json({
                users: users
            })
        })
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({
            success: true
        }))
}

exports.addEmployeeId = (req, res, next) => {
    const _employeeId = new EmployeeId({
        employeeId: req.body.employeeId
    });
    _employeeId.save();
    res.status(201).json({
        success: true
    });
};
