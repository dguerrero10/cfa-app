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
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName,
    });
    care.save()
        .then(() =>
            res.status(201).json({
                success: true
            }))
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.getCares = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = Care.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(caresData => {
            fetchedData = caresData;
            return Care.countDocuments();

        }).then(count => {
            res.status(200).json({
                success: true,
                caresData: fetchedData,
                itemCount: count
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.deleteCares = (req, res, next) => {
    const _ids = req.body.ids;
    Care.deleteMany({ _id: { $in: _ids } })
        .then(() => {
            res.status(200).json({
                success: true
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
}