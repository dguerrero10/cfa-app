const Care = require('../models/care');

exports.createCare = (req, res, next) => {
    const care = new Care({
        guestName: req.body.guestName,
        guestPhoneNUmber: req.body.guestPhoneNumber,
        category: req.body.category,
        issue: req.body.issue,
        otherExplanation: req.body.otherExplanation,
        modeOfVisit: req.body.modeOfVisit,
        teamMemberPosition: req.body.teamMemberPosition,
        leaderName: req.body.leaderName
    });
    care.save().then(careData => {
        res.status(201).json({
            success: true,
            care: careData
        });
    });
};

exports.getCares = (req, res, next) => {
    Care.find().sort({ _id: -1 })
        .then(caresData => {
            res.status(201).json({
                success: true,
                caresData: caresData
            });
        });
};

exports.deleteCares = (req, res, next) => {
    const _ids = req.body.ids;
    Care.deleteMany({ _id: { $in: _ids } })
        .then(() => {
            res.status(201).json({
                success: true
            })
        })
}