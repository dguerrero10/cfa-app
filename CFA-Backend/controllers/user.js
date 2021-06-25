
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.registerUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                employeeId: req.body.employeeId,
                email: req.body.email,
                password: hash
            });
            user.save();
            res.status(201).json({
                success: true
            })
        })
        .catch(err => {
            res.status(401).json({
                error: err
            })
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
    User.deleteOne({_id: req.params.id})
        .then(res.status(200).json({
            success: true
        }))
}