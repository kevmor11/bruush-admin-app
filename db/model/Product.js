const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'product';
  }

  // static get jsonSchema () {
  //   return {
  //     type: 'object',
  //     required: ['username', 'password'],

  //     properties: {
  //       id: {type: 'integer'},
  //       username: {type: 'string', minLength: 1, maxLength: 255},
  //       password: {type: 'string', minLength: 6, maxLength: 255},
  //     }
  //   };
  // }
}

module.exports = Product;
