const { Model } = require('objection');

class Logs extends Model {
  static get tableName() {
    return 'logs';
  }

}

module.exports = Logs;