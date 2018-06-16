const { Model } = require('objection');

class Log extends Model {
  static get tableName() {
    return 'csv_log';
  }

  // static relationMappings = {
  //   customer: {
  //     relation: Model.HasManyRelation,
  //     modelClass: Winner,
  //     join: {
  //       from: 'csv_log.id',
  //       to: 'customer.csv_log_id'
  //     }
  //   }
  // }

  static get jsonSchema () {
    return {
      type: 'object',
      // required: ['username', 'password'],

      properties: {
        id: {type: 'integer'},
        num_winners: {type: 'integer'},
        product_id: {type: 'integer'},
        discount_code: {type: 'string', maxLength: 255},
        email_sent_date: {type: 'date'},
        created_at: {type: 'datetime'},
      }
    };
  }
}

module.exports = Log;