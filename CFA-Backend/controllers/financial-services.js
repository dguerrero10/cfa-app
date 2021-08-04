const FinancialService = require('../models/financial-service');

exports.createFinancialService = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const financialService = new FinancialService({
        receiptPurpose: req.body.receiptPurpose,
        imgPath: url + "/images/" + req.file.filename,
        imgName: req.body.imgName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    financialService.save()
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

exports.getFinancialServices = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = FinancialService.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
          .skip(pageSize * (currentPage -1))
          .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(financialServiceData => {
            fetchedData = financialServiceData;
            return FinancialService.countDocuments();
   
        }).then(count => {
            res.status(200).json({
                success: true,
                financialServiceData: fetchedData,
                itemCount: count
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.deleteFinancialService = (req, res, next) => {
    const _ids = req.body.ids;
    FinancialService.deleteMany({ _id: { $in: _ids } })
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