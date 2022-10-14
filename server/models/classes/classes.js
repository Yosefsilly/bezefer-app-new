module.exports = (Sequelize, sequelize) => {
  const Classes = sequelize.define("classes", {
    classId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    maxSeats: {
      type: Sequelize.STRING,
    },
    currentCapacity: {
      type: Sequelize.INTEGER
    }
  });

  return Classes;
};
