const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'test_1',
    'root',
    'abc1234!',
    {
        'host': 'localhost',
        'dialect': 'mysql'
    }
);

sequelize.define('userInfo', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    pw: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });