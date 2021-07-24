const ItemOrder = require('../models/item-order');

exports.createItemOrder = (req, res, next) => {
    const itemOrder = new ItemOrder({
        workAreaItem: req.body.workAreaItem,
        areasSearched: req.body.areasSearched,
        itemsNeeded: req.body.itemsNeeded,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    itemOrder.save();
    res.status(201).json({
        success: true
    });
};

exports.getItemOrders = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = ItemOrder.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
          .skip(pageSize * (currentPage -1))
          .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(itemOrderData => {
            fetchedData = itemOrderData;
            return ItemOrder.countDocuments();
   
        }).then(count => {
            res.status(200).json({
                success: true,
                itemOrderData: fetchedData,
                itemCount: count
            });
        });
};

exports.deleteItemOrders = (req, res, next) => {
    const _ids = req.body.ids;
    ItemOrder.deleteMany({ _id: { $in: _ids } })
        .then(result => {
            res.status(201).json({
                success: true
            });
        });
}