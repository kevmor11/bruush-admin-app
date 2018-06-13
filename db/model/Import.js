const { Model } = require('objection');

class Import extends Model {
  static get tableName() {
    return 'import';
  }

}

module.exports = Import;
