const BorrowingTracker = require('../models/borrowing-tracker');

exports.createBorrowingTrackerItem = (req, res, next) => {
    const borrowingTracker = new BorrowingTracker({
        itemBorrowed: req.body.itemBorrowed,
        amountOfItem: req.body.amountOfItem,
        fromLocation: req.body.fromLocation,
        toLocation: req.body.toLocation,
        notes: req.body.notes,
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName
    });
    borrowingTracker.save();
    res.status(201).json({
        success: true
    });
};

exports.getBorrowingTrackerItems = (req, res, next) => {
    BorrowingTracker.find().sort({ _id: -1 })
        .then(borrowingTrackerData => {
            res.status(201).json({
                success: true,
                borrowingTrackerData: borrowingTrackerData
            });
        });
};

exports.getBorrowingTrackerItems = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = BorrowingTracker.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
          .skip(pageSize * (currentPage -1))
          .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(borrowingTrackerData => {
            fetchedData = borrowingTrackerData;
            return BorrowingTracker.countDocuments();
   
        }).then(count => {
            res.status(200).json({
                success: true,
                borrowingTrackerData: fetchedData,
                itemCount: count
            });
        })
};

exports.deleteBorrowingTrackerItems = (req, res, next) => {
    const _ids = req.body.ids;
    BorrowingTracker.deleteMany({ _id: { $in: _ids } })
        .then(result => {
            res.status(201).json({
                success: true
            })
        })
}