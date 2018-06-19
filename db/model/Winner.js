const { Model } = require('objection');

class Winners extends Model {
  static get tableName() {
    return 'customer';
  }

}

module.exports = Winners;
