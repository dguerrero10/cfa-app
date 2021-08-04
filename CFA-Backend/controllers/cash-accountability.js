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
    cashAccountability.save()
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

exports.getCashAccountability = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = CashAccountability.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(cashAccountabilityData => {
            fetchedData = cashAccountabilityData;
            return CashAccountability.countDocuments();

        }).then(count => {
            res.status(200).json({
                success: true,
                cashAccountabilityData: fetchedData,
                itemCount: count
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.deleteCashAccountability = (req, res, next) => {
    const _ids = req.body.ids;
    CashAccountability.deleteMany({ _id: { $in: _ids } })
        .then(() => {
            res.status(201).json({
                success: true
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
}