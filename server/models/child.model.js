module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define("Child", {
   parentId : {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    paidAmount : {
      type: DataTypes.INTEGER,
    },
  });
  Child.associate = (models) => {
    Child.belongsTo(models.Parent, {
      foreignKey: 'parentId'
    })
  }
  return Child;
};