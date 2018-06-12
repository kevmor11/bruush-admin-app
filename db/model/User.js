const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'User';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['username', 'password'],

      properties: {
        id: {type: 'integer'},
        username: {type: 'string', minLength: 1, maxLength: 255},
        password: {type: 'string', minLength: 6, maxLength: 255},
      }
    };
  }
}

module.exports = User;