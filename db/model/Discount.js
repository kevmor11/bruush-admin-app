const { Model } = require('objection');

class Discount extends Model {
  static get tableName() {
    return 'discounts';
  }

}

module.exports = Discount;
