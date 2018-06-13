const Import = require('../db/model/Import');

// Get Winners Page.
exports.getImport = (req, res) => {
  res.render('import');
};


exports.postImport = (req, res) => {
  const csv = req.file,
        fileName = csv.originalname,
        productID = req.body.product;
  console.log("CSV", csv);
  console.log("Name", fileName);
  console.log("productID", productID);
};
