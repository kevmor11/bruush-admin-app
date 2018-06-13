const { Model } = require('objection');

class Winners extends Model {
  static get tableName() {
    return 'winners';
  }

}

module.exports = Winners;
