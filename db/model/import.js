const { Model } = require('objection');

class Import extends Model {
  static get tableName() {
    return 'imports';
  }

}

module.exports = Import;