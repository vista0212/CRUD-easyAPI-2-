module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userInfo', {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      pw: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
      }
  })
};