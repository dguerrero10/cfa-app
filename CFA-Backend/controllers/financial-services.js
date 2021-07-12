const FinancialService = require('../models/financial-service');

exports.createFinancialService = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const financialService = new FinancialService({
        receiptPurpose: req.body.receiptPurpose,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imgPath: url + "/images/" + req.file.filename
    });
    financialService.save();
    res.status(201).json({
        success: true
    });
};

exports.getFinancialServices = (req, res, next) => {
    FinancialService.find().sort({ _id: -1 })
        .then(financialServiceData => {
            res.status(201).json({
                success: true,
                financialServiceData: financialServiceData
            });
        });
};

exports.deleteFinancialService = (req, res, next) => {
    const _ids = req.body.ids;
    FinancialService.deleteMany({ _id: { $in: _ids } })
        .then(result => {
            res.status(201).json({
                success: true
            })
        })
}