module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define("Parent", {
    sender: {
      type: DataTypes.STRING,
    },
    receiver: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    totalAmount: {
      type: DataTypes.INTEGER,
    },
  });
  Parent.associate = models => {
    Parent.hasMany(models.Child, {
      foreignKey: 'parentId'
    });
  }
  return Parent;
};