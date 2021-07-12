const CashAccountability = require('../models/cash-accountability');

exports.createCashAccountability = (req, res, next) => {
    const cashAccountability = new CashAccountability({
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName,
        teamMemberFirstName: req.body.teamMemberFirstName,
        teamMemberLastName: req.body.teamMemberLastName,
        shortageOverage: req.body.shortageOverage,
        amountMissing: req.body.amountMissing,
        mixedDrawer: req.body.mixedDrawer,
        mixedDrawerTeamMemberFirstName: req.body.mixedDrawerTeamMemberFirstName,
        mixedDrawerTeamMemberLastName: req.body.mixedDrawerTeamMemberLastName,
        notes: req.body.notes,
    });
    cashAccountability.save();
    res.status(201).json({
        success: true
    });
};

exports.getCashAccountability = (req, res, next) => {
    CashAccountability.find().sort({ _id: -1 })
        .then(cashAccountabilityData => {
            res.status(201).json({
                success: true,
                cashAccountabilityData: cashAccountabilityData
            });
        });
};

exports.deleteCashAccountability = (req, res, next) => {
    const _ids = req.body.ids;
    CashAccountability.deleteMany({ _id: { $in: _ids } })
        .then(result => {
            res.status(201).json({
                success: true
            })
        })
}