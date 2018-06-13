const Import = require('../db/model/Import');

// Get Winners Page.
exports.getImport = (req, res) => {
  res.render('import');
};


exports.postImport = (req, res) => {
  const csv = req.body.csv,
        productID = req.body.product;
  console.log("CSV", csv);
  console.log("productID", productID);
};
